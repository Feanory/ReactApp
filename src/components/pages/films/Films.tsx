import * as React from 'react';
import {Link, Redirect, Route, Switch} from 'react-router-dom';
import axios from "axios";
import * as Loadable from "react-loadable";

import {Button, Loader, Icon} from "semantic-ui-react";
import * as config from "../../../config/apiUrl";
import './Films.css';

export const List = Loadable({
    loader: () => import('../films-list/Films-list'),
    loading: () => (<Loader active inline='centered' />),
});

export const Item = Loadable({
    loader: () => import('../film-item/Film-Item'),
    loading: () => (<Loader active inline='centered' />),
});

export const HTTP = axios.create({
    baseURL: config.apiUrl
 });

interface FilmsState {
    films: any[];
    page: number;
    loading: boolean;
    popular: boolean;
    lastPage: boolean;
    apiKey: string | null;
    requestToken: string | null;
    sessionId: string | null;
}

export default class Films extends React.Component<any, FilmsState> {

    constructor(props: any) {
        super(props);

        this.state = {
            films: [],
            page: 0,
            popular: true,
            loading: false,
            lastPage: false,
            apiKey: localStorage.getItem('api_key'),
            requestToken: localStorage.getItem('request_token'),
            sessionId: sessionStorage.getItem('sessionId')
        }
    }

    componentWillMount() {
        const { sessionId } = this.state;
        if (!sessionId || sessionId === 'undefined') {
            this.authorize();
        }
    }

    public authorize() {
        const { apiKey, requestToken } = this.state;

        return HTTP.post(`/3/authentication/session/new?api_key=${apiKey}`, {
            request_token: requestToken
        }).then((response: any) => {
            sessionStorage.setItem('sessionId', response.data.session_id)
        }, () => {
            return location.replace('/login');
        });
    }

    public getFilms(popular: boolean) {
      this.setState({ loading: true, popular });

      this.getFilmsByKind(popular, 1)
        .then((response: any) => this.setState({
            films: response.data.results,
            loading: false,
            page: response.data.page
        }));
    }

    public loadMore(newPage: number) {
        const { popular, page } = this.state;
        this.setState({ loading: true });

        if (page !== newPage) {
            this.getFilmsByKind(popular, newPage).then((response: any) => this.setFilmsState(response))
        }
    }

    public setFilmsState(response: { data: { results: any[], page: number } }) {
        const { films } = this.state;
        this.setState({
            films: [...films, ...response.data.results],
            loading: false,
            page: response.data.page
        })
    }

    public getFilmsByKind(popular: boolean, page: number) {
        const { apiKey } = this.state;

        return popular
            ? HTTP.get(`/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`)
            : HTTP.get(`/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${page}`);
    }


    public render() {
        const { films, loading, page, lastPage, popular } = this.state;

        return (
            <div className="main-container">
                <div className="buttons-container">
                    <div className="navigation-buttons">
                        <Button.Group>
                            <Button onClick={() => this.getFilms(true)} active={popular} className="popular">
                                <Link to="/films/list">Popular</Link>
                            </Button>
                            <Button.Or />
                            <Button onClick={() => this.getFilms(false)} active={!popular}
                            className="upcoming">
                                <Link to="/films/list">Upcoming</Link>
                            </Button>
                        </Button.Group>
                    </div>
                    <Link to="/login" className="logout-button">
                        <Button compact>
                            <Icon className="sign-out alternate"/>
                        </Button>
                    </Link>
                    
                </div>
                <Switch>
                    <Route path={"/films/list"} render={() => <List
                        films={films}
                        loading={loading}
                        popular={popular}
                        page={page}
                        lastPage={lastPage}
                        loadMoreFilms={(page: number) => this.loadMore(page)}
                        setParams={(stateParams: any) => this.setState(stateParams)}
                    />} >
                    </Route>
                    <Route path={"/films/:id"} component={Item}/>
                    <Redirect to={"/films/list"}/>
                </Switch>


            </div>
        );
    }
}
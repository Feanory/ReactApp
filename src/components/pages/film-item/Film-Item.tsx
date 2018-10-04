import * as React from 'react';
import axios from 'axios';
import {Rating, Table } from "semantic-ui-react";

import * as config from '../../../config/apiUrl';
import './Film-item.css';

export const HTTP = axios.create({
   baseURL: config.apiUrl
});

interface FilmItemState {
    apiKey: string | null;
    requestToken: string | null;
    sessionId: string | null;
    film: any;
    rateLoading: boolean;
}

export default class FilmItem extends React.Component<any, FilmItemState> {

    public imageUrl: string = 'https://image.tmdb.org/t/p/w185';

    constructor(props: any) {
        super(props);

        this.state = {
            apiKey: localStorage.getItem('api_key'),
            requestToken: localStorage.getItem('request_token'),
            sessionId: sessionStorage.getItem('sessionId'),
            film: null,
            rateLoading: false
        };
    }

    public setRate(rate: number) {
        const { film, apiKey, sessionId } = this.state;
        this.setState({ rateLoading: true });
        HTTP.post(`/3/movie/${film.id}/rating?api_key=${apiKey}&session_id=${sessionId}`,
            { value: rate })
            .then(() => {
                this.setState({ rateLoading: false });
            });
    }

    componentWillMount() {
        this.getFilmItem();
    }

    getFilmItem() {
        const { apiKey } = this.state;
        const movieId = this.props.match.params.id;

        HTTP.get(`/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
            .then((response: any) => this.setState({ film: response.data }))
    }

    render() {
        const { film, rateLoading } = this.state;

        return (
            <div className="film-wrapper">
                {film && this.filmItem(film, rateLoading)}
            </div>
        )
    }

    public handleRate = (e: any, { rating }: any) => this.setRate(rating);

    public infoTable = (film: any) => (
        <Table basic='very'>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        Budget:
                    </Table.Cell>
                    <Table.Cell>${film.budget}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        Runtime:
                    </Table.Cell>
                    <Table.Cell>
                        {film.runtime} min
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        Revenue:
                    </Table.Cell>
                    <Table.Cell>${film.revenue}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        Release Date:
                    </Table.Cell>
                    <Table.Cell>{film.release_date}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );

    public filmItem(film: any, loading: boolean) {
        return <div className="column film-item-column" key={film.id}>
            <div className="ui segment film-item">
                <h2 className="film-title">{film.original_title}</h2>
                <div className="film-container">
                    <div className="poster-container">
                        <img src={this.imageUrl + film.poster_path
                        } alt=""/>
                        <h4 style={{margin: '5px 0'}}>{film.tagline}</h4>
                    </div>
                    <div className="info-container">
                        {this.infoTable(film)}
                        <div className="rating-block">
                        <Rating
                            icon='star'
                            onRate={this.handleRate}
                            defaultRating={film.vote_average}
                            disabled={loading}
                            maxRating={10}/>
                        <span> ({film.vote_count})</span>
                </div>
                    </div>
                </div>
                

                <span className="film-description">{film.overview}</span>
            </div>
        </div>
    }
}
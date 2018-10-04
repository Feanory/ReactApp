import * as React from 'react';
import { Link } from 'react-router-dom';
import { Rating, Loader, Item } from 'semantic-ui-react';
import * as InfiniteScroll from 'react-infinite-scroller';
import './Films-list.css';

interface FilmsListProps {
    films: any[];
    page: number;
    loading: boolean;
    popular: boolean;
    lastPage: boolean;
    loadMoreFilms(page: number): void
    setParams(stateParams: any): void
}

export default class FilmsList extends React.Component<FilmsListProps, any> {

  public imageUrl: string = 'https://image.tmdb.org/t/p/w185';

  constructor(props: FilmsListProps) {
    super(props);
  }

  public getMore(newPage: number) {
    this.props.loadMoreFilms(newPage);
  }

  public filmItem(film: any) {
      return (<Item key={film.id}>
          <Item.Image size='small' src={this.imageUrl + film.poster_path} />

          <Item.Content>
              <Item.Header as='div'><Link to={`/films/${film.id}`}>{film.original_title}</Link></Item.Header>
              <Item.Extra>{film.tagline}</Item.Extra>
              <Item.Meta>
                  <Rating
                      icon='star'
                      defaultRating={film.vote_average}
                      maxRating={10} disabled/>
                  <span> ({film.vote_count})</span>
              </Item.Meta>
              <Item.Description>
                  {film.overview}
              </Item.Description>
          </Item.Content>
      </Item>);
  }

  public render() {
    const { films, loading, page, lastPage } = this.props;

    return (
    <div className="main-block">
        <div className="films-container">
            <InfiniteScroll
                pageStart={page}
                loadMore={() => !loading && this.getMore(page && page + 1 || 1)}
                hasMore={!lastPage}
                loader={<div key={0}></div>}
                useWindow={false}
            >
                <Item.Group>
                    {
                        films.length &&
                            films.map((film: any) => film && Object.keys(film).length && this.filmItem(film))
                    }
                    <Loader active={loading} inline='centered' />
                </Item.Group>
            </InfiniteScroll>
        </div>
        {(!films || !films.length && !loading) && <h1>Films list is empty</h1>}
    </div>
    )
  }
}
import React, {Component} from 'react';
import Pagination from './common/pagination'
import {getMovies, deleteMovie, } from "../services/movieService";
import {getGenres} from "../services/genreService";
import {paginate} from "../utils/paginate";
import ListGroup from "./common/ListGroup";
import MoviesTable from "./MoviesTable";
import _ from "lodash";
import {Link} from "react-router-dom";
import SearchBox from "./common/search";
import {toast} from "react-toastify";



class  Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        sortColumn: {path: "title", order: "asc"},
        selectedGenres: null,
        searchQuery: ''

    };
    handleGenreSelect = (genre) => {
        this.setState({selectedGenres: genre, currentPage: 1, searchQuery: ""})
    };

    handleSearch = query => {
        this.setState({searchQuery: query, selectedGenre: null, currentPage: 1});
    };

    handleSort = sortColumn => {
        this.setState({sortColumn});
    };

     async componentDidMount() {
         const { data } = await getGenres();
         let { data: movies } = await getMovies();
        const genres = [{_id: "", name: "All Genres"}, ...data]
        this.setState({movies: movies, genres});
    }

    handleDelete = async (movie) => {
        // deleteMovie(movie)
        const originalMovies = this.state.movies;
        const movies = originalMovies.filter(m => m._id !== movie._id);
        this.setState({movies});

        try {
            await deleteMovie(movie._id);
            toast.info(movie.title+" deleted successfully");
        }
        catch (e) {
            if (e.response && e.response.status === 404) {
                toast.error("This movies has already been deleted");
                this.setState({ movies: originalMovies });
            }
            else if (e.response && e.response.status === 401){
                toast.error("You are not authorized stupido");
                this.setState({ movies: originalMovies });
            }
        }


    };

    // const { movies } = this.state;
    handleLiked = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
        console.log(movie);
    };
    handlePageChange = page => {
        this.setState({currentPage: page});
    };

    handleNewMovie = () => {
    }

    getPagedData = () => {
      const { pageSize, currentPage, sortColumn, selectedGenre, searchQuery, movies: allMovies } = this.state;
      let filtered = allMovies;
      if(searchQuery) {
          filtered = allMovies.filter( m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
      }
      else if (selectedGenre && selectedGenre._id) {
          filtered = allMovies.filter( m => m.genre._id === selectedGenre._id)
      }
      const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

      const movies = paginate(sorted, currentPage, pageSize);

      return { totalCount: filtered.length, data: movies }
    };

    render() {

        const { length: count } = this.state.movies;
        const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
        const { user } = this.props;

        if (count === 0) return <p>There are no movies in the database.</p>;

        const { totalCount, data: movies} = this.getPagedData();

        // const {movies: allMovies, currentPage, pageSize, selectedGenre, sortColumn, searchQuery} = this.state;

        // if (allMovies.length === 0) return <div className="alert alert-info">No movies in the database</div>

        // let filtered = allMovies;
        // if(searchQuery) {
        //     filtered = allMovies.filter( m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
        // }
        // else if (selectedGenre && selectedGenre._id) {
        //     filtered = allMovies.filter( m => m.genre._id === selectedGenre._id)
        // }

        // const filtered = selectedGenres && selectedGenres._id ? allMovies.filter(m => m.genre._id === selectedGenres._id) : allMovies;

        // const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        // const movies = paginate(sorted, currentPage, pageSize)
        // console.log(movies)
        console.log("user:"+user);
        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup selectedItem={this.state.selectedGenres} textProperty='name' valueProperty='_id'
                               items={this.state.genres} onItemSelect={this.handleGenreSelect}/>
                </div>

                <div className="col">
                    {user && <Link className='btn btn-sm btn-primary mb-4' to='/movies/new'>New Movie</Link>}
                    <h5>{`Showing ${totalCount} movies in the database.`}</h5>
                    <SearchBox placeholder='Search...' value={searchQuery} onChange={this.handleSearch} />
                    {movies.length === 0 && "No movies found!"}
                    <MoviesTable movies={movies} onLike={this.handleLiked} onDelete={this.handleDelete}
                                 onSort={this.handleSort} sortColumn={sortColumn} />
                    <Pagination itemsCount={totalCount} pageSize={pageSize}
                                onPageChange={this.handlePageChange} currentPage={currentPage}/>
                </div>

            </div>
        );
    }
}

export default Movies;

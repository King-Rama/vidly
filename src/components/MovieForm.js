import React, {Component} from 'react';
import Form from "./common/form";
import Joi from "joi-browser";
import {getGenres} from "../services/genreService";
import {getMovie, getMovies, saveMovie} from "../services/movieService";

class MovieForm extends Form {

    state = {
        data: {title: '', genreId: "", numberInStock: '', dailyRentalRate: ''},
        genres: [],
        errors: {},
    }

    schema = {
        _id: Joi.string(),
        title: Joi.string().label('Title').required(),
        genreId: Joi.string().label('Genre').required(),
        numberInStock: Joi.number().label('Number in Stock').required().positive().min(0).max(100),
        dailyRentalRate: Joi.number().label('Daily Rental Rate').required().min(0).max(100)
    }


    async componentDidMount() {
        const {data: genres} = await getGenres();
        this.setState({genres})

        const movieId = this.props.match.params.id;
        console.log(`id yetu ile: ${this.props.location.pathname}`);
        if (!movieId) return;

        const {data: movie} = await getMovie(movieId);
        if (!movie) {
            return this.props.history.replace("/not-found");
        }

        this.setState({data: this.mapToViewModel(movie)});
    }

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    }

    doSubmit = async () => {
        await saveMovie(this.state.data);
        this.props.history.push("/movies");
    };

    addMovie(movie) {
        console.log(movie)
    }

    handleChangeSelection = ({currentTarget: input}) => {
        const genre = {...this.state.data}
    };


    render() {
        return (
            <div>
                <h1 className="text-center">Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title', 'Title')}
                    {this.renderSelection("genreId", "Genre", this.state.genres)}
                    {this.renderInput('numberInStock', 'Number in Stock', 'number')}
                    {this.renderInput('dailyRentalRate', 'Rate', 'number')}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}

export default MovieForm;
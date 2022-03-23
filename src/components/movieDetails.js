import React from 'react';

const MovieDetails = (props) => {

    const handleSave = () => {
        // Navigate to /products
        props.history.replace('/movies');
    };

    return (
        <div>
            <h1>This is movie - {props.match.params.id}</h1>
            <button className="btn btn-primary" onClick={handleSave}>Save</button>
        </div>
    );
};

export default MovieDetails;

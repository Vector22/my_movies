import React from 'react';

import VideoListItem from '../components/video-list-item';

export const VideoList = (props) => {
    const { moviesList } = props;
    return (
        <div>
            <ul>
                {
                    moviesList.map((movie) => {
                        // The callback attribut receive object from the
                        // VideoListItem component
                        return <VideoListItem key={movie.id} movie={movie}
                            callback={receiveMovie}
                        />;
                    })
                }
            </ul>
        </div>
    );

    function receiveMovie(movie) {
        // Pass the movie object to the parent (App) component
        console.log("The movie passed from vi-list-item to vi-list: ", movie);
        props.callback(movie);
    }
};
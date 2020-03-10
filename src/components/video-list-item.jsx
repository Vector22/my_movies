import React from 'react';

import { constants } from '../constants';

import '../style/video-list-item.css';

const VideoListItem = (props) => {
    // We use destructuration here
    const { movie } = props;
    // const movie = props.movie same as the prec row
    const imagePath = `${constants["IMAGE_BASE_URL"]}${movie.poster_path}`;
    return (
        <li className="list-group-item" onClick={handleOnClick}>
            <div className="media">
                <div className="media-left">
                    <img src={imagePath} alt="The poster"
                        height='100px' width='100px'
                        className="media-object img-rounded"
                    />
                </div>
                <div className="media-body">
                    <h5>{movie.title}</h5>
                </div>
            </div>
        </li>
    );

    // Not able to use an arrow fuction because of it's scoop.
    // not reachable in the return statement.
    function handleOnClick() {
        props.callback(movie);
    };
};

export default VideoListItem;
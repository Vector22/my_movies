import React from 'react';

import { constants } from '../constants';

const Video = ({ videoKey }) => {
    return (
        <div className="embed-responsive embed-responsive-16by9">
            <iframe src={`${constants["YOUTUBE_VIDEO_BASE_URL"]}${videoKey}`}
                title={videoKey}
                className="embed-responsive-item" />
        </div>
    );
};

export default Video;
import React, { Component } from 'react';
import Axios from 'axios';

import SearchBar from '../components/search-bar';
import VideoDetail from '../components/video-detail';
import Video from '../components/video';
import { VideoList } from '../containers/video-list';

import { constants } from '../constants';

import '../style/App.css';

class App extends Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      currentMovie: {},
      moviesList: [],
    };
  }

  // Make an Ajax call with axios in componentDidMount
  // to avoid side effects
  componentDidMount() {
    // Call the initMovies function
    this.initMovies();
  }

  // Function that is responsible to fetch movies from the API
  initMovies = () => {
    const url = `${constants["API_END_POINT"]}${constants["POPULAR_MOVIES_URL"]}&api_key=${constants["API_KEY"]}`;
    Axios.get(url).then(
      (response) => {
        // Only take the six first movies
        const movies = response.data.results.slice(0, 6);
        this.setState({ currentMovie: movies[0], moviesList: movies.slice(1, 6) },
          () => {
            // Add video to the current movie only if the state is up to date
            this.addVideoToCurrentMovie();
          });
      }
    );
  };

  // This function add a youtubeVideoKey attribut to the currentMovie object
  addVideoToCurrentMovie = () => {
    const videoId = this.state.currentMovie.id;
    const videoUrl = `${constants["API_END_POINT"]}movie/${videoId}?api_key=${constants["API_KEY"]}&append_to_response=videos&include_adult=false`;

    Axios.get(videoUrl).then(
      (response) => {
        // Add a youtubeVideoKey attribut to currentMovie
        const youtubeVideoKey = response.data.videos.results[0].key;
        // This is how we can change a state variable
        let newCurrentMovie = this.state.currentMovie;
        newCurrentMovie.youtubeVideoKey = youtubeVideoKey;
        this.setState({ currentMovie: newCurrentMovie });
        console.log("The currentMovie object: ", this.state.currentMovie);
      }
    );
  };

  // This function receive a movie object from the child video-list-item
  // and update the state[currentMovie] with the selected video.
  receiveMovie = (movie) => {
    this.setState({ currentMovie: movie }, () => {
      this.addVideoToCurrentMovie();
      // And provide the recommendations
      this.setRecommendation();
    });
  };

  // This function receive a text object from the child search-bar
  // and update the App (the main movie) according to the result.
  receiveText = (searchText) => {
    // If the search box is not empty
    if (searchText) {
      const searchUrl = `${constants["API_END_POINT"]}${constants["SEARCH_URL"]}&api_key=${constants["API_KEY"]}&query=${searchText}`;
      Axios.get(searchUrl).then(
        (response) => {
          // Check if the search return a result (the first movie here)
          if (response.data && response.data.results[0]) {
            // If the current movie is the same that the new result
            // we don't do anything
            if (response.data.results[0].id !== this.state.currentMovie.id) {
              this.setState({ currentMovie: response.data.results[0] },
                () => {
                  // Add video to the current movie only if the state is up to date
                  this.addVideoToCurrentMovie();
                  // And provide the recommendations
                  this.setRecommendation();
                });
            }
          }

        }
      );
    }

    console.log("Text received from the SearchBar component: ", searchText);
  };

  // Find some recommended movies according to a movies's ID
  // and update the moviesList with these news values
  setRecommendation = () => {
    const movieId = this.state.currentMovie.id;
    const recUrl = `${constants["API_END_POINT"]}movie/${movieId}/recommendations?api_key=${constants["API_KEY"]}&language=fr&include_adult=false`;

    Axios.get(recUrl).then(
      (response) => {
        // Only take the five first recommended movies
        const movies = response.data.results.slice(0, 5);
        this.setState({ moviesList: movies });
      }
    );
  };

  // Render function inherited from Component
  render() {
    return (
      <div className="App container">
        <header className="row">
          <SearchBar callback={this.receiveText} />
        </header>
        <section>
          <p>

            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </section>

        <div className="row app-body">
          <section className="col-md-8 main-video">
            <Video videoKey={this.state.currentMovie.youtubeVideoKey} />
            <VideoDetail
              title={this.state.currentMovie.title}
              description={this.state.currentMovie.overview}
            />
          </section>

          <section className="col-md-4 video-list">
            <VideoList moviesList={this.state.moviesList}
              callback={this.receiveMovie}
            />
          </section>
        </div>
      </div>
    );
  }
}

export default App;

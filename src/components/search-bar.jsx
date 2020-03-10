import React, { Component } from 'react';

class SearchBar extends Component {

    // The constructor
    constructor(props) {
        super(props);
        this.state = {
            searchText: "", // The text to search
            placeholder: "Enter your movie title..."
        };
    }
    // Function handleChange
    handleChange = (event) => {
        // Add the new entered value to the state
        this.setState({ searchText: event.target.value });
    }

    // This function pass the search text pattern from the searchBar
    // to the parent (App) component
    handleSearchBtn = () => {
        this.props.callback(this.state.searchText);
    }
    render() {
        return (
            <div className="col-md-8 input-group">
                <input
                    onChange={this.handleChange}
                    placeholder={this.state.placeholder}
                    type="text"
                    className="form-control input-lg"
                />

                <span className="input-group-btn">
                    <button className="btn btn-secondary" onClick={this.handleSearchBtn}>
                        Search
                    </button>
                </span>

            </div>
        );
    }
};

export default SearchBar;
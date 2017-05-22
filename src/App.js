import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import axios from 'axios';

class App extends Component {

    state = {
    details: [],
    loading: true,
    error: null
  }

  componentDidMount() {
    // Remove the 'www.' to cause a CORS error (and see the error state)
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=38.0336,-78.5080&radius=5000&opennow&type=restaurant|cafe|bar|pub&key=AIzaSyB2rVkBoZgtNeJAD4Y8rmpapc0nVl1Skk8`)
      .then(res => {
        // Transform the raw data by extracting the nested posts
        let details = res.data.results

        // Update state to trigger a re-render.
        // Clear any errors, and turn off the loading indiciator.
        this.setState({
          details,
          loading: false,
          error: null
        });
      })
      .catch(err => {
        // Something went wrong. Save the error in state and re-render.
        this.setState({
          loading: false,
          error: err
        });
      });
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  renderError() {
    return (
      <div>
        Something went wrong: {this.state.error.message}
      </div>
    );
  }

  renderDetails() {
    // Using destructuring to extract the 'error' and 'posts'
    // keys from state. This saves having to write "this.state.X" everwhere.
    const { error, details } = this.state;

    if(error) {
      return this.renderError();
    }

    return (
      <ul>
        {this.state.details.map((results) =>
          <li key={results.id}>
            <p> Name: {results.name} </p>
            <p> Rating: {results.rating}/5</p>
            <p> Price: {results.price_level}/3</p>
            <p> Address: {results.vicinity}</p>
            <hr/>
          </li>
        )}
      </ul>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Foodie Finder</h2>
        </div>
        <p className = "App-intro">
          A software developer, named Rike Moss, has just moved to Charlottesville. He’s
lived in Northern Virginia for the last few years, meaning he doesn’t know all the
gems of Charlottesville. Help Rike get to know the best city in Virginia by making
him a guide to Charlottesville’s restaurant scene.
Create a web application that displays nearby restaurants and bars in
Charlottesville that are currently open. It should have a list of restaurants / bars on
the left side of the screen, and a map showing their locations on the right. Each
restaurant should display the its rating and price so that Rike can only go to the
best.
        </p>
        <div className="leftHalf">
          <h1>Details</h1>
          <hr/>
        <div>
          {loading ? this.renderLoading() : this.renderDetails()}
        </div>
        </div>
        <div className="rightHalf">
          <h1>Map</h1>
          <iframe width="600" height="450" frameBorder="0" src="https://www.google.com/maps/embed/v1/search?key=AIzaSyA45Osf9cJpNiGLBnhHquPdCiKNOpvF9gk&q=restaurants+bars+in+Charlottesville" allowFullScreen></iframe>
        </div>
      </div>
    );
  }
}

export default App;

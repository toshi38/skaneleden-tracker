import React, { Component } from 'react';
import './App.css';
import Track from './components/Track';
import Header from "./components/Header";

let skaneledenData = require('./data_filtered.json');

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header/>
        <div className="container">
          <div className="row">
            {skaneledenData.map(track => <Track name={track.name} slug={track.slug} segments={track.segments} key={track.slug}/>)}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;

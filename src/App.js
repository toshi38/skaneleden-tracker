import React, { Component } from 'react';
import './App.css';
import Track from './components/Track';

let skaneledenData = require('./data_filtered.json');

class App extends Component {
  render() {
    return (
      <div class="container">
        <div class="row">
          {skaneledenData.map(track => <Track name={track.name} slug={track.slug} segments={track.segments} key={track.slug}/>)}
        </div>
      </div>
    );
  }
}

export default App;

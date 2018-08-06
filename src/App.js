import React, { Component } from 'react';


import Map from './Map'
import * as Data from './Data'

import './App.css';

class App extends Component {

  state = {
    castles: Data.getCastles(),
    infoText: ''
  }

  castleClicked = (id) => {
    // Data.getCastleInfo(id)
  }

  render() {
    return (
      <main className="App">
        
        <h1 className="header">
          Castles in Poland
        </h1>

        <section className="listing-container">
          <label htmlFor="castles-search">Search for a castle:</label>
          <input id="castles-search" />
          
          <ul className="castles-listing">
            <li>Wawel Castle</li>
            <li>Wawel Castle</li>
            <li>Wawel Castle</li>
            <li>Wawel Castle</li>
          </ul>
        </section>

        <Map castles={this.state.castles}>
      
        </Map>
      </main>
    );
  }
}

export default App;

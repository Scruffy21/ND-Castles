import React, { Component } from 'react';

import Map from './Map'

import './App.css';

class App extends Component {
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

        <Map />
      </main>
    );
  }
}

export default App;

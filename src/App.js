import React, { Component } from 'react';


import Map from './Map'
import CastleItem from './CastleItem'
import * as Data from './Data'

import './App.css';

class App extends Component {

  state = {
    castles: Data.getCastles(),
    infoText: {
      __html: ''
    }
  }

  castleClicked = (id) => {
    console.log("castle was clicked");
    Data.getCastleInfo(id)
      .then(response => response.json())
      .then(data => {
        const wikiId = Object.keys(data.query.pages)[0];
        const text = data.query.pages[wikiId].extract;

        this.setState({
          infoText: {
            __html: text
        }});
      })
      .catch(err => console.log(err))
  }

  search = (query) => {
    this.setState({castles: Data.search(query)})
  }

  render() {
    return (
      <main className="App">
        
        <h1 className="header">
          Castles in Poland
        </h1>

        <section className="listing-container">
          <label htmlFor="castles-search">Search for a castle:</label>
          <input id="castles-search" onChange={event => this.search(event.target.value)}/>
          
          <ul className="castles-listing">
            {this.state.castles.map(castle => (
              < CastleItem castle={castle} castleClicked={this.castleClicked} key={castle.id}/>
            ))}
          </ul>
        </section>

        <Map castles={this.state.castles} castleClicked={this.castleClicked}>
      
        </Map>
        <section>
          <h3>Info Section</h3>
          <div dangerouslySetInnerHTML={this.state.infoText}>
          </div>
        </section>
      </main>
    );
  }
}

export default App;

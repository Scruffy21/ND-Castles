import React, { Component } from 'react';
// TODO
//zrob zeby dalo sie zlikwidowac active section/active marker (jakis krzyzyk)
// daj chyba na sidebar te informacje. chociaz sam nie wiem.
// get slightly nicer styling
// accessibility (tab index etc)
// make it work on mobiles! (this will take some time)
// good job though! the markers work now!
// handle google maps API errors (i'm already handling wikipedia errors)

import Map from './Map'
import CastleItem from './CastleItem'
import * as Data from './Data'
import './App.css';

class App extends Component {

  state = {
    castles: Data.getCastles(),
    infoText: {
      __html: 'Information about the cliicked castle will appear here.'
    },
    activeMarker: null
  }

  castleClicked = (id) => {
    Data.getCastleInfo(id)
      .then(response => response.json())
      .then(data => {
        const wikiId = Object.keys(data.query.pages)[0];
        const text = data.query.pages[wikiId].extract;
        this.setState({
          infoText: {
            __html: text
          },
          activeMarker: id
        });
      })
      .catch(err => { 
        this.setState({
          infoText: {
            __html: 'Unfortunately there was an error while loading castle information from Wikipedia. You can try clicking on the castle again.'
        }});
      })
  }

  search = (query) => {
    this.setState({castles: Data.search(query)})
  }



  render() {
    return (
      <main className="App">
        
        

        <section className="info-sidebar">
          <h1 className="header">
            Castles in Poland
          </h1>
          <label htmlFor="castles-search">Search for a castle:</label>
          <input id="castles-search" onChange={event => this.search(event.target.value)}/>
          
          <ul className="castles-listing">
            {this.state.castles.map(castle => (
              < CastleItem castle={castle} castleClicked={this.castleClicked} key={castle.id}/>
            ))}
          </ul>
        </section>

        <Map castles={this.state.castles} castleClicked={this.castleClicked} activeMarker={this.state.activeMarker}/>
        <section className="castle-details">
          <h3>Castle details</h3>
          <div dangerouslySetInnerHTML={this.state.infoText}>
          </div>
        </section>
      </main>
    );
  }
}

export default App;

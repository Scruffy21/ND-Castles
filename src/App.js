import React, { Component } from 'react';
// TODO
//zrob zeby dalo sie zlikwidowac active section/active marker (jakis krzyzyk)
// daj chyba na sidebar te informacje. chociaz sam nie wiem.
// get slightly nicer styling
// accessibility (tab index etc)
// make it work on mobiles! (this will take some time)
// good job though! the markers work now!
// handle google maps API errors (i'm already handling wikipedia errors)

// need to think how to make it responsive for mobiles. where to put the clickable item to expan the sidebar...
// this and accessibility and I think I'm done
// maybe sw to cache also wiki requests...
import Map from './Map'
import CastleItem from './CastleItem'
import * as Data from './Data'
import './App.css';

class App extends Component {

  state = {
    castles: Data.getCastles(),
    infoText: {
      __html: 'Information about the clicked castle will appear here.'
    },
    activeMarker: null,
    sidebarOpened: true
  }

  castleClicked = (id) => {
    const textAddition = `<p style="font-style:italic">Click <a href="https://en.wikipedia.org/wiki/${this.state.castles[id].titleUrl}">here</a> to learn more. Data sourced from <a href="https://en.wikipedia.org/wiki/Main_Page">Wikipedia</a></p>`;

    Data.getCastleInfo(id)
      .then(response => response.json())
      .then(data => {
        const wikiId = Object.keys(data.query.pages)[0];
        const text = data.query.pages[wikiId].extract;
        this.setState({
          infoText: {
            __html: text + textAddition
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

  openSidebar = () => {this.setState({sidebarOpened: true})}

  render() {
    return (
      <main className="App">
        <header>
          <span className="sidebar-opener" title="Open search">&#9776;</span>
          <h1>
            Castles in Poland
          </h1>
        </header>
        
        <section className="info-sidebar">
          <label htmlFor="castles-search">Search for a castle:</label>
          <input id="castles-search" placeholder="Castle search" onChange={event => this.search(event.target.value)} />
          <ul className="castles-listing">
            {this.state.castles.map(castle => (
              < CastleItem castle={castle} castleClicked={this.castleClicked} key={castle.id}/>
            ))}
          </ul>
        </section>

        <Map castles={this.state.castles} castleClicked={this.castleClicked} activeMarker={this.state.activeMarker} />
        
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

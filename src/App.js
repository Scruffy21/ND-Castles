import React, { Component } from 'react';
import classnames from 'classnames'
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

  allCastles = [];

  state = {
    castles: [],
    infoText: {
      __html: 'Information about the clicked castle will appear here.'
    },
    activeMarker: null,
    sidebarOpened: false,
    countryFilter: 'POL'
  }

  constructor() {
    super();
    fetch('data.JSON')
      .then(r => r.json())
      .then(data => {
        this.allCastles = data.slice();
        this.setState({ castles: data.slice() })
      });
  }

  castleClicked = (id) => {
    const textAddition = `<p style="font-style:italic">Click <a target="_blank" href="https://en.wikipedia.org/wiki/${this.state.castles.find(castle => castle.id === id).titleUrl}">here</a> to learn more. Data sourced from <a target="_blank" href="https://en.wikipedia.org/wiki/Main_Page">Wikipedia</a></p>`;

      if (this.state.sidebarOpened === false) {
        this.toggleSidebar();
      }
    Data.getCastleInfo(id, this.allCastles)
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

  filterByCountry = (query) => {
    this.setState({countryFilter: query})
  }

  search = (query) => {
    this.setState({ castles: Data.search(query, this.allCastles) })
  }

  toggleSidebar = () => {
     this.setState(prevState => ({ sidebarOpened: !prevState.sidebarOpened }))
  }

  render() {
    const appClassNames = classnames({
      'app': true,
      'sidebar-open': this.state.sidebarOpened
    })

    return (
      <main className={appClassNames}>
        <header>
          <span className="sidebar-opener" title="Open search" onClick={this.toggleSidebar}>&#9776;</span>
          <h1>
            Castles in Poland
          </h1>
        </header>
        
        <section className="info-sidebar">
          <label htmlFor="country-filter">Filter by ISO code:</label>
          <input id="country-filter" placeholder="Filter by country" value={this.state.countryFilter} onChange={event => this.filterByCountry(event.target.value)} />
          {/* <label htmlFor="castles-search">Search for a castle:</label>
          <input id="castles-search" placeholder="Castle search" onChange={event => this.search(event.target.value)} /> */}
          <ul className="castles-listing">
            {/* {this.state.castles.map(castle => (
              < CastleItem castle={castle} castleClicked={this.castleClicked} key={castle.id}/>
            ))} */}
            {this.state.castles.filter(castle => castle.iso.includes(this.state.countryFilter)).map(castle => (
              < CastleItem castle={castle} castleClicked={this.castleClicked} key={castle.id}/>
            ))}
          </ul>
          <div className="castle-info">
            <h3>Castle details</h3>
            <div dangerouslySetInnerHTML={this.state.infoText}></div>
          </div>
        </section>

        <Map castles={this.state.castles.filter(castle => castle.iso.includes(this.state.countryFilter))} castleClicked={this.castleClicked} activeMarker={this.state.activeMarker} />
      </main>
    );
  }
}

export default App;

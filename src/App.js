import React, { Component } from 'react';
import classnames from 'classnames'

import Map from './Map'
import CastleItem from './CastleItem'
import * as Data from './Data'
import IsoSearch from './IsoSearch'
import './App.css';

class App extends Component {

  allCastles = [];
  countryFilter = 'POL';
  searchQuery = '';
  castlesCountryFiltered = [];

  state = {
    visibleCastles: [],
    infoText: {
      __html: 'Information about the clicked castle will appear here.'
    },
    activeMarker: {
      id: null,
      location: null
    },
    sidebarOpened: false,
  }

  // get castle names and urls from the JSON file
  constructor() {
    super();
    fetch('data.JSON')
      .then(r => r.json())
      .then(data => {
        this.allCastles = data.slice();
        this.filterByCountry(this.countryFilter);
        this.updateVisible(this.searchQuery);
      });
  }

  // when a castle is clicked (either in the list or on the map) retrieve its data from
  // wikipedia. and insert that data into the sidebar. also open the sidebar so that the
  // data is visible
  // also set a new active marker
  castleClicked = (id) => {
    const textAddition = `<p style="font-style:italic">Click <a target="_blank" href="https://en.wikipedia.org/wiki/${encodeURIComponent(this.allCastles[id].name)}">here</a> to learn more. Data sourced from <a target="_blank" href="https://en.wikipedia.org/wiki/Main_Page">Wikipedia</a></p>`;
    

      if (this.state.sidebarOpened === false) {
        this.toggleSidebar();
      }
    
    Data.getCastleInfo(id, this.allCastles[id])
      .then(response => response.json())
      .then(data => {
        const wikiId = Object.keys(data.query.pages)[0];
        const text = data.query.pages[wikiId].extract;
        const name = this.allCastles[id].name;
        const image = data.query.pages[wikiId].original ? data.query.pages[wikiId].original.source : null;
        // eslint-disable-next-line
        const imageInsert = `<image src=\'${image}\' alt=\'${name}\' class=\'castle-image\'>`;
        this.setState({
          infoText: {
            __html: image ? imageInsert + text + textAddition : text + textAddition
          },
          activeMarker: {
            id: id,
            location: this.allCastles[id].location
          }
        });
      })
      .catch(err => {
        this.setState({
          infoText: {
            __html: 'Unfortunately there was an error while loading castle information from Wikipedia. You can try clicking on the castle again.'
        }});
      })
  }

  // reset selected castle and its marker
  resetSelected = () => {
    this.setState({
      infoText: {
        __html: 'Information about the clicked castle will appear here.'
      },
      activeMarker: {
        id: null,
        location: null
      }
    })
  }

  // apply country filter to the entire set of castles
  filterByCountry = (country) => {
    this.countryFilter = country;
    if (country === 'ALL') {
      this.castlesCountryFiltered = this.allCastles.slice();
    }
    else {
      this.castlesCountryFiltered = this.allCastles.filter(castle => castle.iso === country);
    }
    this.updateVisible(this.searchQuery);
  }

  // apply search filter to the country-filtered list of castles
  updateVisible = (searchQuery) => {
    if (this.state.activeMarker.id) {
      this.resetSelected();
    }
    if (searchQuery === '') {
      this.setState({
        visibleCastles: this.castlesCountryFiltered
      })
    }
    else {
      this.setState({
        visibleCastles: this.castlesCountryFiltered.filter(castle => {
          return castle.name.toLowerCase().includes(searchQuery.toLowerCase());
        })
      }
      )
    }
  }

  search = (query) => {
    this.searchQuery = query;
    this.updateVisible(this.searchQuery);
  }

  toggleSidebar = () => {
    this.setState(prevState => ({ sidebarOpened: !prevState.sidebarOpened }))
  }


  render() {
    // an additional module to apply multiple class names to the body, depending on
    // the state
    const appClassNames = classnames({
      'app': true,
      'sidebar-open': this.state.sidebarOpened
    })

    return (
      <main className={appClassNames}>
        <header>
          <button aria-label="Open search" className="sidebar-opener" title="Open search" onClick={this.toggleSidebar}>&#9776;</button>
          <h1>Castles around the world</h1>
        </header>
        
        <section className="info-sidebar" aria-hidden={!this.state.sidebarOpened}>
          <IsoSearch countryFilter={this.countryFilter} filterByCountry={this.filterByCountry}/>
          <label htmlFor="castles-search">Search for a castle:</label>
          <input value={this.searchQuery} id="castles-search" placeholder="Castle search" onChange={event => this.search(event.target.value)} />
          <ul className="castles-listing">
            {this.state.visibleCastles.map(castle => (
              <CastleItem castle={castle} castleClicked={this.castleClicked} key={castle.id}/>
            ))}
          </ul>
          <div role="article" className="castle-info" tabIndex={0} >
            <h3 className="castle-info-header" >Castle details</h3>
            <button aria-label="Reset selected castle" title="Reset selected castle" className="reset-selected" onClick={this.resetSelected}>&#x2715;</button>
            <div dangerouslySetInnerHTML={this.state.infoText}></div>
          </div>
        </section>

        <Map castles={this.state.visibleCastles} castleClicked={this.castleClicked} activeMarker={this.state.activeMarker} />
      </main>
    );
  }
}

export default App;

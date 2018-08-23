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

  castleClicked = (id) => {
    const textAddition = `<p style="font-style:italic">Click <a target="_blank" href="https://en.wikipedia.org/wiki/${encodeURIComponent(this.allCastles[id].name)}">here</a> to learn more. Data sourced from <a target="_blank" href="https://en.wikipedia.org/wiki/Main_Page">Wikipedia</a></p>`;
    

      if (this.state.sidebarOpened === false) {
        this.toggleSidebar();
      }
    
    Data.getCastleInfo(id, this.allCastles[id])
      .then(response => response.json())
      .then(data => {
        console.log(data);
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

  search = (query) => {
    this.searchQuery = query;
    this.updateVisible(this.searchQuery);
  }
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
          <button aria-label="Open search" className="sidebar-opener" title="Open search" onClick={this.toggleSidebar}>&#9776;</button>
          <h1>Castles around the world</h1>
        </header>
        
        <section className="info-sidebar">
          <IsoSearch countryFilter={this.countryFilter} filterByCountry={this.filterByCountry}/>
          <label htmlFor="castles-search">Search for a castle:</label>
          <input value={this.searchQuery} id="castles-search" placeholder="Castle search" onChange={event => this.search(event.target.value)} />
          <ul className="castles-listing">
            {this.state.visibleCastles.map(castle => (
              <CastleItem castle={castle} castleClicked={this.castleClicked} key={castle.id}/>
            ))}
          </ul>
          <div className="castle-info" tabIndex={0}>
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

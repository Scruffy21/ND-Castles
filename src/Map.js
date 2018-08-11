import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

let defaultIcon, highlightedIcon;

// if a wrong key is input, there will be an alert box shown
window.gm_authFailure = function () {
    alert("Unfortunately, google maps authorisation has failed. Perhaps the wrong key was input.");
}

function makeMarkerIcon(markerColor, google) {
    return {
        url: `http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|${markerColor}|40|_|%E2%80%A2`,
        size: new google.maps.Size(21, 34),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(10, 34),
        scaledSize:  new google.maps.Size(21,34)
    };
}

const GoogleMapCont = withScriptjs(withGoogleMap(props => {
    
    // make sure we're not calling the makeMarkerIcon function unnecessarily
    defaultIcon = defaultIcon || makeMarkerIcon('ff1616', window.google);
    highlightedIcon = highlightedIcon || makeMarkerIcon('0091ff', window.google);
    return (
        <GoogleMap
            defaultCenter={{ lat: 52.229676, lng: 19.012229 }}
            defaultZoom={6}
        >
            <MarkerClusterer
                averageCenter
                enableRetinaIcons
                gridSize={60}
            >
                {props.castles.map(castle => (
                    <Marker
                        position={castle.location}
                        title={castle.name}
                        key={castle.id}
                        icon={castle.id === props.activeMarker ? highlightedIcon : defaultIcon}
                        animation={castle.id === props.activeMarker ? window.google.maps.Animation.BOUNCE : null}
                        onClick={() => props.castleClicked(castle.id)}>
                    </Marker>
                ))}
            </MarkerClusterer>
        </GoogleMap>
    )
}));

class Map extends React.Component {

    // // not fully functional, because it's possible that same length but diff values
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(this.props.castles, nextProps.castles, this.props.castles === nextProps.castles);
    //     if ((this.props.castles === nextProps.castles) && (this.props.activeMarker === nextProps.activeMarker)) {
    //         return false;
    //     }
    //     return true;
    // }

    render() {
        return (
            <GoogleMapCont
                containerElement={<div className='map-container' />}
                mapElement={<div id='map' />}
                googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyDDPwx0mGzNzu-2INrplAdAOjyojQ65E6I&v=3'
                loadingElement={<div style={{ height: '100%' }} />}
                castles={this.props.castles}
                castleClicked={this.props.castleClicked}
                activeMarker={this.props.activeMarker}
            />
        )
    }
}

export default Map
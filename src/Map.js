import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const defaultIcon = makeMarkerIcon('ff1616');
const highlightedIcon = makeMarkerIcon('0091ff');

function makeMarkerIcon(markerColor) {
    return {
        url: `http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|${markerColor}|40|_|%E2%80%A2`,
        size: new window.google.maps.Size(21, 34),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(10, 34),
        scaledSize:  new window.google.maps.Size(21,34)
    };
}

const GoogleMapCont = withGoogleMap(props => (
    <GoogleMap
        defaultCenter={{ lat: 52.229676, lng: 19.012229 }}
        defaultZoom={6}
    >
        {props.castles.map(castle => (
            <Marker
                position={castle.location}
                title={castle.name}
                key={castle.id}
                icon={castle.id === props.activeMarker ? highlightedIcon : defaultIcon}
                onClick={() => props.castleClicked(castle.id)}>
            </Marker>
        ))}
    </GoogleMap>
));

class Map extends React.Component {

    render() {
        return (
            <GoogleMapCont
                containerElement={<div className='map-container' />}
                mapElement={<div id='map' />}
                castles={this.props.castles}
                castleClicked={this.props.castleClicked}
                activeMarker={this.props.activeMarker}
            />
        )
    }
}

export default Map
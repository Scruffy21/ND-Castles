import React from 'react'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'

const GoogleMapCont = withGoogleMap(props => (
    <GoogleMap
        defaultCenter={{ lat: 52.229676, lng: 19.012229 }}
        defaultZoom={6}
    >
        {props.castles.map(castle => (
            <Marker position={castle.location} title={castle.name} key={castle.id} onClick={() => props.castleClicked(castle.id)} />
        ))}
        
    </GoogleMap>
));

class Map extends React.Component {

    render() {
        console.log(this.props);


        return (
            <GoogleMapCont
                containerElement={<div className='map-container' />}
                mapElement={<div id='map' />}
                castles={this.props.castles}
                castleClicked={this.props.castleClicked}
            />
        )
    }
}

export default Map
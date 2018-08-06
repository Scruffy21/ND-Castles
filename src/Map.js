import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

class Map extends React.Component {
    render() {
        const GoogleMapCont = withGoogleMap(props => (
            <GoogleMap
                defaultCenter={{ lat: 52.229676, lng: 19.012229 }}
                defaultZoom={6}
            >
                {this.props.castles.map(castle => (
                    <Marker position={castle.location} title={castle.name} key={castle.id}/>
                ))}
            </GoogleMap>
        ));

        return (
            <GoogleMapCont
                containerElement={<div className='map-container' />}
                mapElement={<div id='map' />}
            />
        )
    }
}

export default Map
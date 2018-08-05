import React from 'react'
import { withGoogleMap, GoogleMap } from 'react-google-maps'

class Map extends React.Component {
    render() {
        const GoogleMapExample = withGoogleMap(props => (
            <GoogleMap
                defaultCenter={{ lat: 52, lng: 20 }}
                defaultZoom={6}
            >
            </GoogleMap>
        ));

        return (
            <GoogleMapExample
                containerElement={<div className='map-container' />}
                mapElement={<div id='map' />}
            />
        )
    }
}

export default Map
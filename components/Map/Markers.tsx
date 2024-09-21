import { DestinationCoordinatesContext } from '@/context/DestinationCoordinateContext';
import { SourceCoordinatesContext } from '@/context/SourceCoordinateContext';
import { UserLocationContext } from '@/context/UserLocationContext';
import React, { useContext } from 'react'
import { Marker } from 'react-map-gl'

function Markers() {

    const { userLocation, setUserLocation } =
    useContext<any>(UserLocationContext);
    const {sourceCoordinates, setSourceCoordinates} =useContext<any>(SourceCoordinatesContext)
    const {destinationCoordinates, setDestinationCoordinates} = useContext<any>(DestinationCoordinatesContext)
  return (
    <>
    <div>
        {/* User Marker */}
    <Marker longitude={userLocation?.lng} latitude={userLocation?.lat} anchor="bottom" >
      <img src="./pin.png" className="w-10 h-10"/>
    </Marker>

          {/* Source Marker */}
          {sourceCoordinates?
          <Marker longitude={sourceCoordinates?.lng} latitude={sourceCoordinates?.lat} anchor="bottom" >
      <img src="./pin.png" className="w-10 h-10"/>
    </Marker>
    :null
    }

    
          {/* Destination MArker */}
          {destinationCoordinates?
          <Marker longitude={destinationCoordinates?.lng} latitude={destinationCoordinates?.lat} anchor="bottom" >
      <img src="./pin.png" className="w-10 h-10"/>
    </Marker>
    :null
    }

    </div>
    </>
    
  )
}

export default Markers
import React, { useContext, useEffect, useRef } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { UserLocationContext } from "@/context/UserLocationContext";
import { DestinationCoordinatesContext } from '@/context/DestinationCoordinateContext';
import { SourceCoordinatesContext } from '@/context/SourceCoordinateContext';
import Markers from "./Markers";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import MapBoxRoute from "./MapBoxRoute";
import DistanceTime from "./DistanceTime";

function MapBoxMap() {
  const mapRef = useRef<any>();

  const { userLocation, setUserLocation } =
    useContext<any>(UserLocationContext);
    const {sourceCoordinates, setSourceCoordinates} =useContext<any>(SourceCoordinatesContext)
    const {destinationCoordinates, setDestinationCoordinates} = useContext<any>(DestinationCoordinatesContext)

    const {directionData, setDirectionData} =useContext<any>(DirectionDataContext)

  // set marker to source location
  useEffect(()=>{
    if(sourceCoordinates){
      mapRef.current?.flyTo({
        center:[
          sourceCoordinates.lng,sourceCoordinates.lat
        ],
      duration: 2500
      }
      )
    }
  },[sourceCoordinates])

  // set marker to destination location
  useEffect(()=>{
    if(destinationCoordinates){
      mapRef.current?.flyTo({
        center:[
          destinationCoordinates.lng,destinationCoordinates.lat
        ],
      duration: 2500
      }
      )
    }
    if(sourceCoordinates&&destinationCoordinates){
      getDirection()
    }
  },[destinationCoordinates])


  const getDirection = async() => {
    const BASE_URL="https://api.mapbox.com/directions/v5/mapbox/driving/"
  const res= await fetch(`${BASE_URL}${sourceCoordinates.lng},${sourceCoordinates.lat};${destinationCoordinates.lng},${destinationCoordinates.lat}?annotations=maxspeed&overview=full&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`,
  {
    headers:{
      "Content-Type":"application/json"
    }
  })

  const result = await res.json();
  setDirectionData(result);

  console.log("ROUTE",result.routes)



  }

  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Map</h2>
      <div className="rounded-lg overflow-hidden">
        {userLocation ? (
          <Map
          ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation?.lng,
              latitude: userLocation?.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 450, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers />

            {directionData?.routes?
            (
              <MapBoxRoute
              coordinates={directionData?.routes[0]?.geometry?.coordinates}/>
            ):null}



          </Map>
        ) : null}
        
      </div>
      <div className="absolute bottom-20 z-20 right-[20px] hidden md:block">
      <DistanceTime/>
      </div>
    </div>
  );
}

export default MapBoxMap;

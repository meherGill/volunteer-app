import React, { useCallback, useEffect, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import axios from 'axios'

const GCP_API_KEY = 'AIzaSyBFvNDoVEJqDkF_pMJOBBMl97FLhpSJJ6A'

interface IGMapsProps {
  width: string
  height: string
  start_lat: number
  start_long: number
  options: object | undefined
  markers: object | undefined
  callBackFunction: Function | undefined | ((e: google.maps.MapMouseEvent) => void)
  ref: any
}

const GMaps = React.forwardRef((props: IGMapsProps, ref) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GCP_API_KEY,
  })

  let latLng = { lat: props.start_lat, lng: props.start_long }

  const [map, setMap] = useState(null)
  // const [markerVals, setMarkerVals] = useState<any>([]);
  const markerVals = props.markers
  const containerStyle = {
    width: props.width,
    height: props.height,
    zIndex: 0,
  }

  const onLoad = useCallback(function callback(map) {
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  //CHANGE THE WAY KEY WORKS IN THIS MAP, THIS IS JUST A SHORT HACK
  const getMarkerObject = () => {
    const markers = markerVals as Array<any>
    return markers.map((val, ndx) => {
      if (val.label) {
        return (
          <Marker
            key={val.lat * val.lng * ndx}
            position={{ lat: val.lat, lng: val.lng }}
            label={val.label}
          />
        )
      } else {
        return <Marker key={val.lat * val.lng * ndx} position={{ lat: val.lat, lng: val.lng }} />
      }
    })
  }
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={latLng}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={props.options === undefined ? { disableDefaultUI: true } : props.options}
      onClick={props.callBackFunction as (e: google.maps.MapMouseEvent) => void}
    >
      {getMarkerObject()}
    </GoogleMap>
  ) : (
    <></>
  )
})

export default GMaps

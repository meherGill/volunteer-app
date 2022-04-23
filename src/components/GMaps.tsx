import React, { useCallback, useEffect, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import axios from 'axios'

let markers: Array<{ lat: number; lng: number }> = []

const GCP_API_KEY = 'AIzaSyBFvNDoVEJqDkF_pMJOBBMl97FLhpSJJ6A'

interface IGMapsProps {
  width: string
  height: string
}

let latLong = { lat: -33.715751380693824, lng: 151.04661363979582 }
const URL_FOR_CAMPAIGNS = 'http://localhost:3000/api/campaign'

const GMaps = (props: IGMapsProps) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GCP_API_KEY,
  })

  const [forceRender, setForceRender] = useState(-1)
  const [map, setMap] = useState(null)
  const [markerVals, setMarkerVals] = useState<any>([])
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

  useEffect(() => {
    axios.get(URL_FOR_CAMPAIGNS).then(res => {
      console.log('next')
      let arr = res.data
      for (let i = 0; i < res.data.length; i++) {
        let mapVals = res.data[i].location.M
        console.log(mapVals)
        let obj = {
          lat: parseFloat(mapVals.lat.S),
          lng: parseFloat(mapVals.lng.S),
        }
        // console.log(obj)
        markers.push(obj)
      }
      setMarkerVals(markers)
    })
  }, [])

  const getMarkerObject = () => {
    const markers = [...markerVals]
    console.log(markers)
    return markers.map(val => <Marker position={{ lat: val.lat, lng: val.lng }} />)
  }
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={latLong}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        zoomControl: false,
      }}
    >
      {getMarkerObject()}
    </GoogleMap>
  ) : (
    <></>
  )
}

export default GMaps

import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import GMaps from './GMaps'

const URL_FOR_CAMPAIGNS = 'http://localhost:3000/api/campaign'

const MainUser = () => {
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const router = useRouter()
  const [_markers, set_markerVals] = useState<any>([])
  const [start_latLng, setStart_latLng] = useState({ lat: 0, lng: 0 })
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  }

  function success(pos: any) {
    var crd = pos.coords

    setStart_latLng({ lat: crd.latitude, lng: crd.longitude })
    set_markerVals((curr_vals: Array<any>) => {
      let new_arr = [...curr_vals]
      new_arr.push({
        lat: crd.latitude,
        lng: crd.longitude,
        label: 'current position',
      })
      return new_arr
    })
  }

  function error(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options)
    // let _height = window.innerHeight;
    let _width = window.innerWidth

    if (_width > 1000) {
      setWidth('950px')
    } else {
      setWidth(_width - 50 + 'px')
    }
    setHeight('300px')
  }, [])

  useEffect(() => {
    let markers: Array<object> = _markers
    axios.get(URL_FOR_CAMPAIGNS).then(res => {
      let arr = res.data
      for (let i = 0; i < res.data.length; i++) {
        let mapVals = res.data[i].location.M
        let obj = {
          lat: parseFloat(mapVals.lat.S),
          lng: parseFloat(mapVals.lng.S),
        }
        // console.log(obj)
        markers.push(obj)
      }
      set_markerVals(markers)
    })
  }, [])

  const showQuickDonate = () => {
    router.push('/quickDonate')
  }

  const showRequestAid = () => {
    router.push('/requestAid')
  }

  const showImpact = () => {}

  const showCommunity = () => {}

  return (
    <>
      {console.log(_markers)}ß
      <div className="flex justify-center mt-10">
        <GMaps
          width={width}
          height={height}
          start_lat={start_latLng.lat}
          start_long={start_latLng.lng}
          options={undefined}
          markers={_markers}
          callBackFunction={() => null}
        />
      </div>
      <div className="flex flex-col justify-start items-center">
        <div className="w-full mt-8 pl-2 ">
          <h2 className="text-2xl font-bold font-sans">Quick Access</h2>
        </div>
        <div className="max-w-md grid grid-rows-2 grid-cols-2 gap-4 mt-6 mb-10">
          <div className="flex justify-center items-center">
            <button
              className="rounded-md w-40 h-24 bg-gradient-to-tr from-indigo-300 to-cyan-500"
              onClick={showQuickDonate}
            >
              Quick Donate
            </button>
          </div>
          <div className="flex justify-center items-center">
            <button
              className="rounded-md w-40 h-24 bg-gradient-to-tr from-amber-500 to-orange-200"
              onClick={showRequestAid}
            >
              Request Aid
            </button>
          </div>
          <div className="flex justify-center items-center">
            <button
              className="rounded-md w-40 h-24 bg-gradient-to-tr from-red-200 to-orange-500"
              onClick={showImpact}
            >
              Your Impact
            </button>
          </div>
          <div className="flex justify-center items-center">
            <button
              className="rounded-md w-40 h-24 bg-gradient-to-tr from-indigo-300 to-cyan-500"
              onClick={showCommunity}
            >
              Community
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainUser

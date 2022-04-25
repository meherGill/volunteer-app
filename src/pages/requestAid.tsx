import GMaps from '@components/GMaps'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import Geocode from 'react-geocode'
import { ArrowLeftIcon } from '@heroicons/react/solid'
const GCP_API_KEY = 'AIzaSyBFvNDoVEJqDkF_pMJOBBMl97FLhpSJJ6A'
import RequestAidModal from '@components/requestAidModal'

const RequestAid = () => {
  Geocode.setApiKey(GCP_API_KEY)
  const router = useRouter()
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [_marker, set_marker] = useState<Array<any>>([])
  const [showModal, set_showModal] = useState<boolean>(false)
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  }
  const [start_latLng, setStart_latLng] = useState({ lat: 0, lng: 0 })
  function success(pos: any) {
    var crd = pos.coords
    set_marker([
      {
        lat: crd.latitude,
        lng: crd.longitude,
        label: 'current position',
      },
    ])
    setStart_latLng({ lat: crd.latitude, lng: crd.longitude })
  }

  function error(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }

  const onClickSOS = () => {
    set_showModal(true)
  }

  const onClickBackdrop = () => {
    set_showModal(false)
  }

  const clickBack = () => {
    router.push('/VolunteerHome')
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options)
    // let _height = window.innerHeight;
    let _width = window.innerWidth
    let _height = window.innerHeight
    setWidth(_width + 'px')
    setHeight(_height + 'px')
  }, [])

  const onMapClickFunction = (e: any) => {
    console.log(e.latLng.lat())
    console.log(e.latLng.lng())
    set_marker((marker: Array<any>) => {
      let new_markers = [...marker]
      if (new_markers.length > 1) {
        new_markers.pop()
      }
      new_markers.push({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        label: 'chosen location',
      })
      return new_markers
    })
  }

  return (
    <div className="w-screen h-screen">
      <div className="z-0">
        <GMaps
          width={width}
          height={height}
          start_lat={start_latLng.lat}
          start_long={start_latLng.lng}
          options={undefined}
          markers={_marker}
          callBackFunction={onMapClickFunction}
        />
      </div>
      <div className="rounded-[50px] flex flex-row justify-start items-center z-10 absolute top-0 w-full bg-gray-800 p-3 border-4 border-gray-500">
        <button className="w-10 h-3 flex items-center ml-3" onClick={clickBack}>
          <ArrowLeftIcon color="white" />
        </button>
        <h1 className="w-full flex items-center justify-center text-2xl mr-5 font-raleway text-gray-200">
          REQUEST AID
        </h1>
      </div>
      <div className="absolute w-full bottom-0 flex justify-center items-center">
        <button
          className="btn btn-error z-10 rounded-full  w-24 h-24 mb-8 text-xl text-gray-50 drop-shadow-[0_35px_35px_rgb(0,0,0)]"
          onClick={onClickSOS}
        >
          SOS
        </button>
      </div>
      {showModal ? (
        <div
          className="pls z-20 w-screen h-screen bg-gray-700/80 absolute top-0 flex justify-center"
          onClick={() => {
            set_showModal(false)
          }}
        >
          <div className="flex justify-center items-center h-full w-11/12">
            <RequestAidModal marker={_marker} />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default RequestAid

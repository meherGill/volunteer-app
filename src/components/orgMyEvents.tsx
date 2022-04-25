import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Geocode from 'react-geocode'

interface jsonData {
  title: string
  description: string
  virtualOnly: boolean
  address: string
  id: string
}

const URL_FOR_CAMPAIGNS = 'http://localhost:3000/api/campaign'
const GCP_API_KEY = 'AIzaSyBFvNDoVEJqDkF_pMJOBBMl97FLhpSJJ6A'

const OrgMyEvents = () => {
  Geocode.setApiKey(GCP_API_KEY)

  const [data, setData] = useState<Array<any>>([])
  const [refresh, setRefresh] = useState(-1)

  const getCampaigns = () => {
    axios.get(URL_FOR_CAMPAIGNS).then(async res => {
      let vals = res.data
      let new_arr = []
      for (let i = 0; i < res.data.length; i++) {
        let objectToConsider = res.data[i]
        console.log(objectToConsider)
        // console.log(objectToConsider.location.M.lat.S, objectToConsider.location.M.lng.S)
        let location = await Geocode.fromLatLng(
          objectToConsider.location.M.lat.S.toString(),
          objectToConsider.location.M.lng.S.toString(),
        )
        let x = location.results[0].formatted_address
        // console.log(x)
        new_arr.push({
          title: objectToConsider.title.S,
          description: 'lorem ipsum',
          address: x,
          virtualOnly: false,
          id: objectToConsider._id.S,
        })
      }
      //   console.log(res.data)
      setData(new_arr)
    })
  }

  const deleteEvent = (id: string) => {
    axios.delete(URL_FOR_CAMPAIGNS + `?_id=${id}`)
    setRefresh(refresh * -1)
  }
  useEffect(() => {
    getCampaigns()
  }, [])
  const getComponents = (data: Array<jsonData>): any => {
    // console.log(data)
    return data.map((val, ndx) => {
      return (
        <li
          key={val.title + ndx}
          className="flex flex-col w-full items-start justify-center rounded-sm card p-2 my-3"
        >
          <h2 className="bg-orange-200 w-full font-bold p-3 rounded-lg">{val.title}</h2>
          <p className="p-3">{val.description}</p>
          <div className="flex flex-row justify-between w-full">
            <p className="p-3">
              {!val.virtualOnly ? 'Location : ' + val.address : 'Virtual Event'}
            </p>
            <button id={val.id} className="btn btn-error mr-4" onClick={() => deleteEvent(val.id)}>
              Remove
            </button>
          </div>
        </li>
      )
    })
  }
  return <div>{getComponents(data)}</div>
}

export default OrgMyEvents

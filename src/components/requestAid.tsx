import axios from "axios";
import React from "react";
import Geocode from "react-geocode";

const GCP_API_KEY = "AIzaSyBFvNDoVEJqDkF_pMJOBBMl97FLhpSJJ6A";
const URL_FOR_AID = "http://localhost:3000/api/aid"
const RequestAid = () => {
    Geocode.setApiKey(GCP_API_KEY)
    const handleSubmitForAid = (e : React.MouseEvent<any>) => {
        e.preventDefault()
        const chkBox = document.querySelector("#attachLocationCheckbox") as HTMLInputElement;
        const attachAddress = chkBox.checked;
        const description = (document.querySelector("#requestAid_description") as HTMLInputElement).value
        let latLng = {
            lat: 0,
            lng: 0,
        }
        const userData = JSON.parse(localStorage.getItem("userData") as string)
        console.log("userData")
        console.log(userData)
        if (attachAddress){
            const input = document.querySelector("#addressForAid") as HTMLInputElement;
            const address = input.value;
            Geocode.fromAddress(address).then(res => {
                // console.log("h")
                const { lat, lng } = res.results[0].geometry.location;
                latLng.lat = lat;
                latLng.lng = lng;
                console.log("fire")
                

                axios.post(URL_FOR_AID, {email : userData.email, address: address, description: description}).then(res => {
                    console.log(res)
                })
            }, err => {
                console.log(err)
                alert("Incorrect address")
            })
        }
        else{
            console.log("fire2")
            axios.post(URL_FOR_AID, {email : userData.email, address: "", description: description}).then(res => {
                console.log(res)
            })
        }
    }
    return(
        <div className="flex justify-center  h-full w-full pt-4">
            <div className="w-4/5 h-4/5 bg-bg2-500 rounded-md shadow-lg">
                <form>
                <div className="flex flex-col justify-center items-center mt-6">
                    <div className="flex flex-col w-11/12">
                        <label className="form-label">Description</label>
                        <textarea id="requestAid_description" className="form-control bg-btn-500 text-sFont-500 placeholder:text-gray-700 border-2 rounded-md p-2 border-bg1-500
                            " 
                        placeholder="Write about your problem here"
                        rows={5}></textarea>
                    </div>
                    <div className="flex flex-col w-11/12 mt-10">
                        <span>
                        <label className="form-label mr-4">Attach Location ?</label><input id="attachLocationCheckbox" type="checkbox"></input>
                        </span>
                        <input id="addressForAid" type="text" className="form-control bg-btn-500 text-sFont-500 placeholder:text-gray-700 border-2 rounded-md p-2 border-bg1-500" 
                        placeholder="Write address here"></input>
                    </div>
                    <button onClick={(e) => handleSubmitForAid(e)} className="bg-green-200 p-3 rounded-sm mt-10">
                        SUBMIT REQUEST FOR AID
                    </button>
                </div>
                </form>
            </div>
            <button
              onClick={handleSubmitForAid}
              className="bg-green-200 p-3 rounded-sm mt-10"
            >
              SUBMIT REQUEST FOR AID
            </button>
          </div>
  );
};

export default RequestAid;

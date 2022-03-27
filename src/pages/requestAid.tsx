import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import Geocode from "react-geocode";

const GCP_API_KEY = "AIzaSyBFvNDoVEJqDkF_pMJOBBMl97FLhpSJJ6A";
const URL_FOR_AID = "http://localhost:3000/api/aid"

const RequestAid = () => {
    Geocode.setApiKey(GCP_API_KEY)
    const router = useRouter();
    
    const handleSubmitForAid = (e : React.MouseEvent<any>) => {
        e.preventDefault()
        const description = (document.querySelector("#requestAid_description") as HTMLInputElement).value
        let latLng = {
            lat: 0,
            lng: 0,
        }
        const userData = JSON.parse(localStorage.getItem("userData") as string)
        console.log("userData")
        console.log(userData)
        const input = document.querySelector("#addressForAid") as HTMLInputElement;
        const address = input.value;

        Geocode.fromAddress(address).then(res => {
            const { lat, lng } = res.results[0].geometry.location;
            latLng.lat = lat;
            latLng.lng = lng;
            axios.post(URL_FOR_AID , {email: userData.email , address: address, description: description}).then(res => {
                        console.log(res)
                        alert("Request posted successfully")
                    }, err => {
                        console.log(err)
                        alert("FAILED TO SUBMIT REQUEST")
                    });
        }, err => {
            console.log(err)
            alert("Incorrect address");
        })
    }

    const clickBack = () => {
        router.push("/VolunteerHome")
    }

    return(
        <div className="w-screen h-screen bg-orange-50">
            <div className="w-full h-16 bg-orange-200">
                <button className="h-full p-3 px-8 bg-orange-300"
                    onClick={clickBack}>
                        {"BACK"}
                </button>
            </div>
            <div>
                <form className="flex flex-col items-center">
                    <textarea id="requestAid_description"
                        className="form-control w-10/12 mt-10 rounded-md p-4"
                        placeholder="Describe your problem">
                    </textarea>
                    <input id="addressForAid" type="text" className="form-control w-10/12 mt-10 p-3 rounded-md"
                        placeholder="Enter your location here (optional)"></input>
                    <button type="submit" onClick={handleSubmitForAid}
                        className="p-3 bg-orange-300 rounded-md mt-10">
                        Submit
                    </button>
                </form>
            </div>

        </div>
    )
};

export default RequestAid;

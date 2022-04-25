import React, { useState } from "react";
import { MicrophoneIcon } from "@heroicons/react/solid";
import axios from "axios";

const URL_FOR_AID = "http://localhost:3000/api/aid";

interface IRequestAidModalProps {
    marker: Array<any>;
}
const RequestAidModal = (props: IRequestAidModalProps) => {
    const submitRequest = () => {
        const userData = JSON.parse(localStorage.getItem("userData") as string);

        if (category === "") {
            alert("Please select a category");
        } else {
            let locationToSend = { lat: 0, lng: 0 };

            if (props.marker.length < 1) {
                alert(
                    "Shouldnt be possible, error here, length of props.marker has to be atleast 1"
                );
                console.log(props);
                return;
            } else if (props.marker.length === 1) {
                locationToSend.lat = props.marker[0].lat;
                locationToSend.lng = props.marker[0].lng;
            } else if (props.marker.length === 2) {
                locationToSend.lat = props.marker[1].lat;
                locationToSend.lng = props.marker[1].lng;
            } else {
                alert(
                    "Shouldnt be possible, error here, length of props.marker can be max 2"
                );
                return;
            }
            axios
                .post(URL_FOR_AID, {
                    email: userData.email,
                    address: locationToSend,
                    description: category,
                })
                .then(
                    (res) => {
                        console.log(res);
                        alert("request posted successfully");
                    },
                    (err) => {
                        console.log(err);
                        alert("request failed");
                    }
                );
        }
    };

    const [category, setCategory] = useState<string>("");
    return (
        <div className="bg-orange-50 flex flex-col justify-center items-center p-4 rounded-2xl">
            <h1 className="text-2xl p-8 text-center font-roboto">
                What help do you need ?
            </h1>
            <button className="rounded-full h-20 w-20 bg-accent p-6 mb-10">
                <MicrophoneIcon />
            </button>
            <div></div>
            <div className="grid grid-cols-2 grid-rows-2 gap-x-2 gap-y-3 p-1">
                <button
                    className="btn btn-primary text-white"
                    onClick={() => setCategory("Medical Assistance")}
                >
                    Medical Assistance
                </button>
                <button
                    className="btn btn-primary text-white"
                    onClick={() => setCategory("Essentials")}
                >
                    Essentials
                </button>
                <button
                    className="btn btn-primary text-white"
                    onClick={() => setCategory("Accomodation")}
                >
                    Accomodation
                </button>
                <button
                    className="btn btn-primary text-white"
                    onClick={() => setCategory("Others")}
                >
                    Others
                </button>
            </div>
            <button
                className="btn btn-accent bg-gradient-to-l from-neutral to-accent w-full mt-10"
                onClick={submitRequest}
            >
                Submit Request
            </button>
            <p className="underline text-accent text-center mt-10 mb-10 font-bold text-sm">
                Your current location along with information provided will be
                broadcasted for volunteering organisations to pick up
            </p>
        </div>
    );
};

export default RequestAidModal;

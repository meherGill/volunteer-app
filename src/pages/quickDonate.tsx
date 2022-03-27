import { useRouter } from "next/router";
import React from "react";

const quickDonate = () => {

    const router = useRouter();
    
    const clickBack = () => {
        router.push("/VolunteerHome")
    }

    const submitDonation = () => {

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
                <form className="flex flex-col items-center rounded-md">
                    <h1 className="mt-10 text-2xl text-gray-500 rounded-md">SEND MONEY</h1>
                        <input type="text" className="px-3 py-2 mt-10 rounded-md" placeholder="Amount"></input>
                    <h1 className="mt-10 text-2xl text-gray-500 rounded-md">OR</h1>
                    <h1 className="text-2xl text-gray-500 rounded-md">DONATE OTHER THINGS</h1>
                        <textarea className="px-3 py-2 mt-10 w-4/5 rounded-md" placeholder="Write about what you are going to donate"></textarea>
                    <h1 className="mt-10 text-2xl text-gray-500 rounded-md">CHOOSE YOUR CHARITY</h1>
                    <input type="text" className="mt-5 px-3 py-2 rounded-md"></input>
                    <button onSubmit={submitDonation} className="bg-orange-200 p-3 mt-10 rounded-lg">Submit</button>
                </form>
            </div>

        </div>
    )
};

export default quickDonate
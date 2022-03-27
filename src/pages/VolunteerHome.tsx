import type { NextPage } from "next";
import AppBar from "../components/AppBar";
import MainUser from "@components/VolunteerMain";
import { useEffect, useState } from "react";

const VolunteerHome: NextPage = () => {

    const [authenticated, setAuthenticated] = useState(0)
    const whatToReturn = () => {
        if (authenticated === 1){
            return(
                <div className="w-full h-full">
                    <div className="flex justify-center items-center bg-orange-50">
                        <div className="max-w-lg h-full">
                            <AppBar />
                            <MainUser />
                        </div>
                    </div>
                </div>
            )
        }
        else if(authenticated === 2){
            return(
                <h1> YOURE NOT AUTHENTICATED, PLEASE GO BACK TO LOGIN PAGE AND TRY AGAIN</h1>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }

    useEffect(() => {
        const data = window.localStorage.getItem("authenticated");
        const accountType = window.localStorage.getItem("accountType");
        if (data === "true" && accountType === "volunteer"){
            console.log("pp")
            setAuthenticated(1)
        }
        else{
            setAuthenticated(2)
        }
    }, [])

    return (
        <div className="bg-white">
            {whatToReturn()}
        </div>
    );
};

export default VolunteerHome;

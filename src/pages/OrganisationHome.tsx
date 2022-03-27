import React, { useState } from "react";
import type { NextPage } from "next";
import AppBar from "@components/AppBar";
import OrgCreateEvent from "@components/orgCreateEvent";
import OrgCheckForAid from "@components/orgCheckForAid";
import OrgMyEvents from "@components/orgMyEvents";

enum OrgComponents {
    CREATE_EVENT = 1,
    CHECK_FOR_AID = 2,
    MY_EVENTS = 3,
    DONATIONS = 4,
}
const OrgHome: NextPage = () => {

    const [selectedComponent, setSelectedComponent] = useState(OrgComponents.MY_EVENTS);
    
    const whatComponentToShow = () => {
        const val = selectedComponent;
        if (val === OrgComponents.CREATE_EVENT){
            return(
                <OrgCreateEvent />
            )
        }
        else if (val === OrgComponents.CHECK_FOR_AID){
            return(
                <OrgCheckForAid />
            )
        }
        else if (val === OrgComponents.MY_EVENTS){
            return(
                <OrgMyEvents />
            )
        }
        else if(val === OrgComponents.DONATIONS){
            return(
                <div></div>
            )
        }
    }
    const orgButtonHandler = (val : number) => {
        setSelectedComponent(val);
    }

    //bg-cyan-700 text-indigo-50 
    return (
        <div className="h-screen w-screen">
            <AppBar />
            <div className="org_grid">
                <div className="org_sidebar flex flex-col divide-y-2 bg-cyan-500">
                    <button id="org_createEvent" onClick={() => orgButtonHandler(OrgComponents.CREATE_EVENT)} className={(selectedComponent === OrgComponents.CREATE_EVENT ? "bg-cyan-700 text-indigo-50 " : "") + "hover:bg-cyan-300 h-24 w-full"}> 
                        Create Event 
                    </button>
                    <button id="org_checkForAid" onClick={() => orgButtonHandler(OrgComponents.CHECK_FOR_AID)} className={(selectedComponent === OrgComponents.CHECK_FOR_AID ? "bg-cyan-700 text-indigo-50 " : "") + "hover:bg-cyan-300 h-24 w-full"}> 
                        Check who needs AID
                    </button>
                    <button id="org_myEvents" onClick={() => orgButtonHandler(OrgComponents.MY_EVENTS)} className={(selectedComponent === OrgComponents.MY_EVENTS ? "bg-cyan-700 text-indigo-50 " : "") + "hover:bg-cyan-300 h-24 w-full"}>
                        My Events
                    </button>
                    <button id="org_pendingDonations" onClick={() => orgButtonHandler(OrgComponents.DONATIONS)} className={(selectedComponent === OrgComponents.DONATIONS ? "bg-cyan-700 text-indigo-50 " : "") + "hover:bg-cyan-300 h-24 w-full"}>
                        Pending Donations
                    </button>
                </div>
                <div className="org_content">
                    {whatComponentToShow()}
                </div>
                <div className="org_chats bg-gray-300">
                </div>
            </div>
        </div>
    )
}

export default OrgHome
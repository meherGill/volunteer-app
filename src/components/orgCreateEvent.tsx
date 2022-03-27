import React from "react";

const OrgCreateEvent = () => {
    const onSubmitHandler = (e: any) => {
        e.preventDefault()
    }

    const createEvent = () => {
        let title = (document.querySelector("#org_createevent_title") as HTMLInputElement).value
        let description = (document.querySelector("#org_createevent_dscr") as HTMLInputElement).value
        let isVirtual = (document.querySelector("#org_createevent_isVirtual") as HTMLInputElement).checked
        let address = (document.querySelector("#org_createevent_address") as HTMLInputElement).value
        let JSON = {}
        if (isVirtual){
            
        }
    }

    return(
        <div className="h-full w-full flex justify-center items-start">
            <div className="h-4/5 w-4/5 card mt-10 bg-gray-50">
                <form onSubmit={onSubmitHandler} className="relative flex flex-col justify-start items-center h-full w-full">
                    <label className="mt-14" htmlFor="org_createevent_title">TITLE OF EVENT</label>
                    <input id="org_createevent_title" type="text" name="org_createevent_title" className="border-2 border-sky-500 form-control"></input>
                    <label className="mt-10" htmlFor="org_createvent_description">Description</label>
                    <textarea id="org_createevent_dscr" className="form-control border-2 border-sky-500 rounded-sm" name="org_createvent_description"></textarea>
                    <div className="mt-10">
                        <label htmlFor="org_createvent_isVirtual">Make the event purely virtual</label>
                        <input id="org_createevent_isVirtual" type="checkbox" className="ml-4 form-control" name="org_createvent_isVirtual"></input>
                    </div>
                    <label className="mt-10" htmlFor="org_createvent_address">Address of event</label>
                    <input id="org_createevent_address" type="text" className="form-control border-2 border-sky-500"></input>
                    <button className="absolute bottom-5 right-5 bg-cyan-400 p-3 rounded-md hover:bg-cyan-900 hover:text-white" 
                    onClick={createEvent}>
                        Create Event
                    </button>
                </form>
            </div>
        </div>
    )
};

export default OrgCreateEvent
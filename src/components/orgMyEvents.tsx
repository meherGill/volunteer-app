import React from "react";

interface jsonData {
    title: string,
    description: string,
    virtualOnly: boolean,
    address: string,
}

const mockData = [
    {
        title: "Event 1",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        virtualOnly: false,
        address: "2 prescott drive"
    },
    {
        title: "Event 2",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        virtualOnly: false,
        address: "2 prescott drive"
    },
    {
        title: "Event 3",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        virtualOnly: true,
        address: ""
    },
    {
        title: "Event 4",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        virtualOnly: false,
        address: "15 freshwater place"
    },

]
const OrgMyEvents = () => {

    const getComponents = (data: Array<jsonData>) : any => {
        console.log(data)
        return data.map((val , ndx) => {
            return (
                <li key={val.title} className="flex flex-col w-full items-start justify-center rounded-sm card p-2 my-3">
                    <h2 className="bg-orange-200 w-full font-bold p-3 rounded-lg">{val.title}</h2>
                    <p className="p-3">{val.description}</p>
                    <div className="flex flex-row justify-between w-full">
                        <p className="p-3">{!val.virtualOnly ? "Location : " + val.address : "Virtual Event"}</p>
                        <button className="btn btn-error mr-4">Remove</button>
                    </div>
                </li>
            )   
        })
    }
    return(
        <div>
            {getComponents(mockData)}
        </div>
    )
}

export default OrgMyEvents;
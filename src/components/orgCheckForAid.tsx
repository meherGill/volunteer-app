import React from "react";

interface jsonData {
    userEmail : string,
    location: string,
    description: string,
}

const mockData = [
    {
        userEmail : "t@b.com",
        location: "abc xyz",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        userEmail : "xyz@gmail.com",
        location: "abc 123 street",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        userEmail : "pqrs@yahoo.com",
        location: "",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        userEmail : "a@gmail.com",
        location: "oxford street",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        userEmail : "bambam@yahoo.com",
        location: "sydney nsw something",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    }
];

const OrgCheckForAid = () => {

    const contactUser = (data : Array<jsonData>, ndx : number) => {
        
    };

    const getComponents = (data: Array<jsonData>) => {
        return data.map((val , ndx) => {
            return (
                <li key={val.userEmail+ndx} className="relative flex flex-col w-full items-start justify-center rounded-sm card p-2 my-3">
                    <h2 className="bg-orange-200 w-full font-bold p-3 rounded-lg">{val.userEmail}</h2>
                    <p className="p-3">{val.description}</p>
                    <p className="p-3">{val.location === "" ? "Location not provided"  : "Address : " + val.location}</p>
                    <button onClick={() => {contactUser(data , ndx)}} className="absolute bottom-3 right-3 p-2 bg-cyan-300 hover:bg-cyan-700 hover:text-white rounded-md">Contact User</button>
                </li>
            )
        })
    }
    return (
        <div>
            {getComponents(mockData)}
        </div>
    )
}

export default OrgCheckForAid;
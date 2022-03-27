import React from "react";

interface jsonData {
    donationId: string,
    from: string,
    information: string,
}

const mockData : Array<jsonData>= [
    {
        donationId: "1234",
        from: "xyz@23.com",
        information: "10 units of clothes",
    },
    {
        donationId: "AB656",
        from: "x@23.com",
        information: "2 units of clothes",
    },
    {
        donationId: "avbc",
        from: "y@23.com",
        information: "100 dollars",
    },
    {
        donationId: "n23$2",
        from: "raman@gma3.com",
        information: "10 bags of wheat",
    }
];

const PendingDonations = () => {

    const getComponents = (data: Array<jsonData>) => {
        return data.map((val , ndx) => {
            return (
                <li key={val.donationId} className="relative flex flex-col w-full items-start justify-center rounded-sm card p-2 my-3">
                    <h2 className="bg-orange-200 w-full font-bold p-3 rounded-lg">{val.from}</h2>
                    <p className="p-3 mb-8">{val.information}</p>
                    <div className="flex absolute bottom-3 right-3 p-2">
                        <button className="bg-green-300 p-3 ml-3 rounded-md">Completed</button>
                        <button className="bg-red-300 p-3 ml-3 rounded-md">Cancel</button>
                        <button className="p-3 ml-3 text-red-600 hover:text-red-900 rounded-md">REPORT</button>
                    </div>
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

export default PendingDonations;
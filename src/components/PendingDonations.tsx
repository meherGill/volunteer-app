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
        from: "xyz@23.com",
        information: "2 units of clothes",
    },
    {
        donationId: "avbc",
        from: "xyz@23.com",
        information: "100 dollars",
    },
    {
        donationId: "n23$2",
        from: "raman@gma3.com",
        information: "10 bags of wheat",
    }
];

const PendingDonations = () => {
    return (
        <div>

        </div>
    )
}

export default PendingDonations;
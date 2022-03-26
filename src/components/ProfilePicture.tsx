import { IpcNetConnectOpts } from 'net';
import type { NextPage } from 'next';
import React from 'react';

interface IProfilePicProps  {
    imgLocation: string
}
const ProfilePicture = (props : IProfilePicProps) => {
    return(
       <div>
           <img src={props.imgLocation} className="h-44">

           </img>
       </div>
    )
}

export default ProfilePicture;

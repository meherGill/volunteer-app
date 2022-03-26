import type { NextPage } from 'next';
import React from 'react';
import ProfilePicture from './ProfilePicture';
/*
<div>
                    <button className='w-full h-full bg-bg1-500 mr-1 hover:bg-cyan-900 hover:text-alrtBx-500'>Find nearest opportunity</button>
                </div>
                <div>
                    <button className='w-full h-full bg-bg1-500 ml-1 hover:bg-cyan-900 hover:text-alrtBx-500'>Request AID</button>
                </div>
                <div>
                    <button className='w-full h-full bg-bg1-500 mt-1 mr-1 hover:bg-cyan-900 hover:text-alrtBx-500'>Quick Donate</button>
                </div>
                <div>
                    <button className='w-full h-full bg-bg1-500 mt-1 ml-1 hover:bg-cyan-900 hover:text-alrtBx-500'>Your Stats</button>
                </div>    
                */

const MainUser = () => {
    return(
        <>
        <div className='w-full h-16'></div>
        <div className="flex h-full w-full justify-start">
            <div className="flex flex-col w-64 bg-btn-500 border-solid border-t-2 border-gray-800 divide-y divide-gray-800">
                <div>
                    <ProfilePicture imgLocation='/profilePic.jpeg'/>
                </div>
                <div>
                    <button className="h-24 w-full hover:bg-rose-200">Find Nearby Opportunities</button>
                </div>
                <div>
                    <button className="h-24 w-full hover:bg-rose-200">Quick Donate</button>
                </div>
                <div>
                    <button className="h-24 w-full hover:bg-rose-200">REQUEST AID</button>
                </div>
                <div>
                    <button className="h-24 w-full hover:bg-rose-200">STATS</button>
                </div>
            </div>
            <div className="grow-3 bg-gray-800 grid grid-rows-2 grid-cols-2 x-divide-2 y-divide-2">
            </div>
            <div className="grow-1 bg-bg2-500 p-2">

            </div>
        </div>
        </>
    )
}

export default MainUser;

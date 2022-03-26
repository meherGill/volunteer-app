import type { NextPage } from 'next';
import React from 'react';

const MainUser = () => {
    return(
        <>
        <div className='w-full h-16'></div>
        <div className="flex h-full w-full justify-start divide-x-2">
            <div className="grow-3 bg-gray-800 grid grid-rows-2 grid-cols-2 x-divide-2 y-divide-2">
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
            </div>
            <div className="grow-1 bg-bg2-500 p-2">
            </div>
        </div>
        </>
    )
}

export default MainUser;

import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import GMaps from './GMaps';
import ProfilePicture from './ProfilePicture';
import RequestAid from './requestAid';

enum Components {
  MAP = "map",
  STATS = "stats",
  REQUEST_AID = "request aid",
  DONATE = "donate",
}

const MainUser = () => {
    
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");   
    const router = useRouter()
    
    useEffect(() => {
        // let _height = window.innerHeight;
        let _width = window.innerWidth;

        if (_width > 1000){
            setWidth("950px")
        }
        else{
            setWidth((_width - 50) + "px")
        }
        setHeight("300px")
    }, [])

    const showQuickDonate = () => {
        router.push("/quickDonate")
    }

    const showRequestAid = () => {
        router.push("/requestAid")
    }

    const showImpact = () => {

    }

    const showCommunity = () => {

    }

    return(
        <>
            <div className='flex justify-center mt-10'>
                <GMaps width={width} height={height}/> 
            </div>
            <div className='flex flex-col justify-start items-center'>
                <div className='w-full mt-8 pl-2 '><h2 className='text-2xl font-bold font-sans'>Quick Access</h2></div>
                <div className='max-w-md grid grid-rows-2 grid-cols-2 gap-4 mt-6 mb-10'>
                        <div className="flex justify-center items-center">
                            <button className='rounded-md w-40 h-24 bg-gradient-to-tr from-indigo-300 to-cyan-500'
                                onClick={showQuickDonate}>
                                    
                                Quick Donate
                            </button>
                        </div>
                        <div className="flex justify-center items-center">
                            <button className='rounded-md w-40 h-24 bg-gradient-to-tr from-amber-500 to-orange-200'
                                onClick={showRequestAid}>
                                Request Aid
                            </button>
                        </div>
                        <div className="flex justify-center items-center">
                            <button className='rounded-md w-40 h-24 bg-gradient-to-tr from-red-200 to-orange-500'
                                onClick={showImpact}>
                                Your Impact
                            </button>
                        </div>
                        <div className="flex justify-center items-center">
                            <button className='rounded-md w-40 h-24 bg-gradient-to-tr from-indigo-300 to-cyan-500'
                                onClick={showCommunity}>
                                Community
                            </button>
                        </div>
                </div>
            </div>
        </>
    )
}

export default MainUser;

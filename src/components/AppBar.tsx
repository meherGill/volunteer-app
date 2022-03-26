import type { NextPage } from 'next';
import React from 'react';

const AppBar = () => {
    return(
        <div className="flex fixed w-full h-16 bg-btn-500 justify-start divide-x-2 p-2">
            <div className='grow-3'>Search box</div>
            <div className='grow-1'>profile</div>
        </div>
    )
}

export default AppBar;

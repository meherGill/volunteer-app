import React from "react";
import dynamic from 'next/dynamic'

const AblyChatComponent = dynamic(() => import('../components/AblyChatComponent'), { ssr: false });

const Chat = () => {
    return(
        <div>
            <h1>CHAT</h1>
            <AblyChatComponent />
        </div>
    )
}

export default Chat;
import React from "react";
import dynamic from 'next/dynamic'

const AblyChatComponent = dynamic(() => import('../components/AblyChatComponent'), { ssr: false });

interface IChatProps {
    email1 : string,
    email2 : string
}

const Chat = (props : IChatProps) => {
    return(
        <div>
            <h1>CHAT</h1>
            <AblyChatComponent email1={props.email1} email2={props.email2}/>
        </div>
    )
}

export default Chat;
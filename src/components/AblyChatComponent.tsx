import React, { useEffect, useState } from 'react';
import { useChannel } from "./AblyReactEffect";
import styles from './AblyChatComponent.module.css';

interface IChatProps{
    email1: string,
    email2: string,
}

const AblyChatComponent = (props: IChatProps) => {
    let inputBox : any = null;
    let messageEnd : any = null;

    let channel_name = ""
    let temp_arr = [props.email1 , props.email2].sort();
    channel_name = temp_arr.join("-");
    
    const [messageText, setMessageText] = useState("");
    const [receivedMessages, setMessages] = useState([""]);
    const messageTextIsEmpty = messageText.trim().length === 0;

    const [channel , ably] = useChannel(channel_name, (message : any) => {
        const history = receivedMessages.slice(-199);
        setMessages([...history, message])
    })

    const sendChatMessage = (messageText: any) => {
        (channel as any).publish({ name: "chat-message", data: messageText });
        setMessageText("");
        inputBox.focus();
    }

    const handleFormSubmission = (event : any) => {
        event.preventDefault();
        sendChatMessage(messageText);
    }

    const handleKeyPress = (e : any) => {
        if (e.charCode !== 13 || messageTextIsEmpty) {
            return;
        }
        sendChatMessage(messageText);
        e.preventDefault();
      }

    const messages = receivedMessages.map((message : any, index) => {
        const author = message.connectionId === (ably as any).connection.id ? "me" : "other";
        return <span key={index} className="" data-author={author}>{message.data}</span>;
      });

    useEffect(() => {
        messageEnd.scrollIntoView({ behaviour: "smooth" });
    });
    return (
    <div className={styles.chatHolder}>
      <div className={styles.chatText}>
        {messages}
        <div ref={(element) => { messageEnd = element; }}></div>
      </div>
      <form onSubmit={handleFormSubmission} className={styles.form}>
        <textarea
          ref={(element) => { inputBox = element; }}
          value={messageText}
          placeholder="Type a message..."
          onChange={e => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
          className={styles.textarea}
        ></textarea>
        <button type="submit" className={styles.button} disabled={messageTextIsEmpty}>Send</button>
      </form>
    </div>
  )
}

export default AblyChatComponent
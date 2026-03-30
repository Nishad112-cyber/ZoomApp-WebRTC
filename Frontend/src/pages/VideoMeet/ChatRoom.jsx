import React from 'react';
import { TextField, Button } from '@mui/material';
import styles from "../../styles/videoComponent.module.css";

export default function ChatRoom({ messages, message, handleMessageChange, sendMessage }) {
    return (
        <div className={styles.chatRoom}>
            <div className={styles.chatContainer}>
                <h1>Chat</h1>
                <div className={styles.chattingDisplay}>
                    {messages.length !== 0 ? messages.map((item, index) => (
                        <div style={{ marginBottom: "20px" }} key={index}>
                            <p style={{ fontWeight: "bold" }}>{item.sender}</p>
                            <p>{item.data}</p>
                        </div>
                    )) : <p>No Messages Yet</p>}
                </div>
                <div className={styles.chattingArea}>
                    <TextField
                        value={message}
                        onChange={handleMessageChange}
                        id="outlined-basic"
                        label="Enter Your chat"
                        variant="outlined"
                    />
                    <Button variant='contained' onClick={sendMessage}>Send</Button>
                </div>
            </div>
        </div>
    );
}
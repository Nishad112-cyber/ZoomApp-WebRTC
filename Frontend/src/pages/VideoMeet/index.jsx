import React, { useState, useRef } from 'react';
import LocalVideo from './LocalVideo';
import RemoteVideos from './RemoteVideos';
import ChatRoom from './ChatRoom';
import Controls from './Controls';
import { initializeSocket, sendMessageSocket } from './socketHandler';
import styles from "../../styles/videoComponent.module.css";

export default function VideoMeet() {
    const [video, setVideo] = useState(true);
    const [audio, setAudio] = useState(true);
    const [screen, setScreen] = useState(false);
    const [screenAvailable, setScreenAvailable] = useState();
    const [messages, setMessages] = useState([]);
    const [newMessages, setNewMessages] = useState(3);
    const [askForUsername, setAskForUsername] = useState(true);
    const [username, setUsername] = useState("");
    const [videos, setVideos] = useState([]);
    const [showModal, setModal] = useState(true);
    const [message, setMessage] = useState("");

    const localVideoref = useRef();
    const socketRef = useRef();
    const socketIdRef = useRef();
    const videoRef = useRef([]);

    // Handlers
    const handleVideo = () => setVideo(!video);
    const handleAudio = () => setAudio(!audio);
    const handleScreen = () => setScreen(!screen);
    const handleEndCall = () => {
        try {
            localVideoref.current.srcObject.getTracks().forEach(track => track.stop());
        } catch (e) { console.log(e); }
        window.location.href = "/";
    };
    const openChat = () => { setModal(true); setNewMessages(0); };
    const closeChat = () => setModal(false);
    const handleMessageChange = (e) => setMessage(e.target.value);

    const addMessage = (data, sender, socketIdSender) => {
        setMessages(prev => [...prev, { sender, data }]);
        if (socketIdSender !== socketIdRef.current) setNewMessages(prev => prev + 1);
    };

    const sendMessage = () => {
        sendMessageSocket(socketRef.current, message, username);
        setMessage("");
    };

    const connect = () => {
        setAskForUsername(false);
        initializeSocket({
            socketRef,
            socketIdRef,
            localVideoref,
            video,
            audio,
            setVideos,
            videoRef,
            addMessage
        });
    };

    return (
        <div>
            {askForUsername ? (
                <div>
                    <h2>Enter into Lobby</h2>
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <button onClick={connect}>Connect</button>
                    <LocalVideo
                        localVideoref={localVideoref}
                        video={video}
                        audio={audio}
                        screen={screen}
                        setScreenAvailable={setScreenAvailable}
                    />
                </div>
            ) : (
                <div className={styles.meetVideoContainer}>
                    {showModal && (
                        <ChatRoom
                            messages={messages}
                            message={message}
                            handleMessageChange={handleMessageChange}
                            sendMessage={sendMessage}
                            closeChat={closeChat}
                        />
                    )}
                    <Controls
                        video={video}
                        audio={audio}
                        screen={screen}
                        screenAvailable={screenAvailable}
                        newMessages={newMessages}
                        setModal={setModal}
                        showModal={showModal}
                        handleVideo={handleVideo}
                        handleAudio={handleAudio}
                        handleScreen={handleScreen}
                        handleEndCall={handleEndCall}
                        openChat={openChat}
                    />
                    <LocalVideo
                        localVideoref={localVideoref}
                        video={video}
                        audio={audio}
                        screen={screen}
                        setScreenAvailable={setScreenAvailable}
                    />
                    <RemoteVideos videos={videos} videoRef={videoRef} />
                </div>
            )}
        </div>
    );
}
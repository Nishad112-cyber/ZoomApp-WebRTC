import io from "socket.io-client";
import server from '../environment';

var connections = {};
const peerConfigConnections = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

export const initializeSocket = ({ socketRef, socketIdRef,  setVideos, videoRef, addMessage }) => {
    socketRef.current = io.connect(server, { secure: false });

    socketRef.current.on('signal', (fromId, message) => {
        const signal = JSON.parse(message);
        if (fromId !== socketIdRef.current) {
            if (signal.sdp) {
                connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
                    if (signal.sdp.type === 'offer') {
                        connections[fromId].createAnswer().then(description => {
                            connections[fromId].setLocalDescription(description).then(() => {
                                socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }));
                            });
                        });
                    }
                });
            }
            if (signal.ice) connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice));
        }
    });

    socketRef.current.on('connect', () => {
        socketRef.current.emit('join-call', window.location.href);
        socketIdRef.current = socketRef.current.id;

        socketRef.current.on('chat-message', addMessage);

        socketRef.current.on('user-left', id => setVideos(videos => videos.filter(v => v.socketId !== id)));

        socketRef.current.on('user-joined', (id, clients) => {
            clients.forEach(socketListId => {
                connections[socketListId] = new RTCPeerConnection(peerConfigConnections);

                // ICE candidates
                connections[socketListId].onicecandidate = event => {
                    if (event.candidate != null) {
                        socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }));
                    }
                };

                // Remote tracks
                connections[socketListId].ontrack = event => {
                    let videoExists = videoRef.current.find(v => v.socketId === socketListId);
                    if (videoExists) {
                        setVideos(videos => {
                            const updated = videos.map(v => v.socketId === socketListId ? { ...v, stream: event.streams[0] } : v);
                            videoRef.current = updated;
                            return updated;
                        });
                    } else {
                        const newVideo = { socketId: socketListId, stream: event.streams[0], autoplay: true, playsinline: true };
                        setVideos(videos => {
                            const updated = [...videos, newVideo];
                            videoRef.current = updated;
                            return updated;
                        });
                    }
                };

                // Add local tracks if available
                if (window.localStream) {
                    window.localStream.getTracks().forEach(track => {
                        connections[socketListId].addTrack(track, window.localStream);
                    });
                }
            });
        });
    });
};

// Send chat message
export const sendMessageSocket = (socketRef, message, username) => {
    socketRef.emit('chat-message', message, username);
};
# Zoom Clone – WebRTC Video Meeting App

A real-time video conferencing web application built using the MERN stack and WebRTC.  
This project allows multiple users to join a meeting room, share video/audio streams, and communicate through real-time chat.

The application uses **WebRTC** for peer-to-peer video streaming and **Socket.IO** for signaling and real-time communication.

---

## Features

- Real-time video conferencing
- Multiple users in the same meeting room
- Audio and video toggle
- Live chat during meeting
- Join meeting with username
- Real-time user join/leave detection
- Peer-to-peer media streaming using WebRTC
- Responsive video layout

---

## Tech Stack

### Frontend
- React.js
- CSS Modules
- Material UI
- WebRTC
- Socket.IO Client

### Backend
- Node.js
- Express.js
- Socket.IO
- MongoDB Atlas

---

## Project Structure

```
Frontend
│
├── src
│   ├── pages
│   │   └── VideoMeet
│   │        ├── index.jsx
│   │        ├── LocalVideo.jsx
│   │        ├── RemoteVideos.jsx
│   │        ├── Controls.jsx
│   │        ├── ChatRoom.jsx
│   │        ├── socketHandler.js
│   │
│   ├── Contexts
│   │     └── AuthProvider.jsx
│   │
│   ├── styles
│   │     └── videoComponent.module.css
│   │
│   └── environment.js
│
Backend
│
├── controllers
├── routes
├── models
├── socketManager.js
└── app.js
```

---

## How It Works

1. A user enters a username and joins the meeting.
2. The frontend connects to the server using Socket.IO.
3. When a new user joins, a WebRTC peer connection is created.
4. Media streams are captured using `getUserMedia()`.
5. Signaling (SDP and ICE candidates) is exchanged via the server.
6. Peer-to-peer connections are established between participants.
7. Video streams are displayed dynamically.


## Future Improvements

- Screen sharing
- Meeting room links
- Participant list
- Meeting recording
- Better UI/UX
- Mobile responsiveness



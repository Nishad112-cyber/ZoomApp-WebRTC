import React, { useEffect } from 'react';

export default function LocalVideo({ localVideoref, video, audio,  setScreenAvailable }) {

    // Check permissions and screen availability
    useEffect(() => {
        const checkPermissions = async () => {
            try {
                // Check if screen share is available
                setScreenAvailable(!!navigator.mediaDevices.getDisplayMedia);

                // Initial permission check for video/audio
                await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            } catch (error) {
                console.log("Permissions error:", error);
            }
        };
        checkPermissions();
    }, [setScreenAvailable]);

    // Update local stream whenever video/audio changes
    useEffect(() => {
        const updateStream = async () => {
            // Stop old tracks
            if (window.localStream) {
                window.localStream.getTracks().forEach(track => track.stop());
            }

            if (video || audio) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video, audio });
                    window.localStream = stream;
                    if (localVideoref.current) localVideoref.current.srcObject = stream;
                } catch (e) {
                    console.log("getUserMedia error:", e);
                }
            } else {
                // If both video/audio off, assign empty stream
                const emptyStream = new MediaStream();
                window.localStream = emptyStream;
                if (localVideoref.current) localVideoref.current.srcObject = emptyStream;
            }
        };
        updateStream();
    }, [video, audio, localVideoref]);

    return <video ref={localVideoref} autoPlay muted className="local-video"></video>;
}
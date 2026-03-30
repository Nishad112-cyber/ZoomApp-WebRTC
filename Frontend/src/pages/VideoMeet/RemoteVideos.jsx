import React, { useEffect } from 'react';

export default function RemoteVideos({ videos, videoRef }) {

    // Keep videoRef updated
    useEffect(() => {
        videos.forEach(video => {
            if (videoRef.current[video.socketId] === undefined) {
                videoRef.current[video.socketId] = null;
            }
        });
    }, [videos, videoRef]);

    return (
        <div className="conferenceView">
            {videos.map((video) => (
                <div key={video.socketId}>
                    <video
                        data-socket={video.socketId}
                        ref={ref => {
                            if (ref && video.stream) {
                                ref.srcObject = video.stream;
                                videoRef.current[video.socketId] = ref; // Maintain reference
                            }
                        }}
                        autoPlay
                        playsInline
                    />
                </div>
            ))}
        </div>
    );
}
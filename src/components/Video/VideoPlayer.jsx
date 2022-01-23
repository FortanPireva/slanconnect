import React from "react";
import VideoJS from "./video";
const VideoPlayer = ({ src, type }) => {
  return (
    <VideoJS
      options={{
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
          {
            src: src,
            type: type,
          },
        ],
      }}
    />
  );
};

export default VideoPlayer;

import React from "react";
import VideoJS from "../Video/video";

const VideoPreviewer = ({ videoSources }) => {
  return (
    <div className="flex justify-center items-center w-full z-50  ">
      {videoSources &&
        videoSources.map((source, i) => {
          return (
            <VideoJS
              key={i}
              options={{
                autoplay: false,
                controls: true,
                responsive: true,
                fluid: true,
                sources: [
                  {
                    src: source.src,
                    type: source.type,
                  },
                ],
              }}
            />
          );
        })}
    </div>
  );
};

export default VideoPreviewer;

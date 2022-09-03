import React from "react";

function Video() {
  return (
    <div className="w-full">
      <iframe
        className="md:min-h-[600px] min-h-[300px] w-full h-full"
        src="https://www.2embed.to/embed/tmdb/movie?id=550"
        frameborder="0"
        title="Film Video Player"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Video;

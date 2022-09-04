import React from "react";
import { getMovieEmbed, getTvEmbed } from "../../shared/utils";
import useTvVideo from "../../store/tvVideo";

function Video({ type, film }) {
  const { tvVideo } = useTvVideo();
  
  console.log("🚀 ~ file: index.jsx ~ line 8 ~ Video ~ tvVideo", tvVideo)
  return (
    <div className="w-full">
      <iframe
        className="md:min-h-[600px] min-h-[300px] w-full h-full"
        src={
          type === "movie"
            ? getMovieEmbed(film?.detail?.id)
            : getTvEmbed(
                film?.detail?.id,
                tvVideo.season_number,
                tvVideo.episode_number
              )
        }
        title="Film Video Player"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Video;

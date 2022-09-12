import React from "react";
import { getMovieEmbed, getTvEmbed } from "../../shared/utils";
import useFilmDetailStore from "../../store/film";

function Video({ type, film }) {
  const { tvVideo } = useFilmDetailStore();

  return (
    <div className="w-full">
      {/* We're Sorry! */}
      {/* We can't find the file you are looking for. It maybe got deleted by the owner or was removed due a copyright violation. */}
      <iframe
        className="md:min-h-[600px] min-h-[300px] w-full h-full"
        title="Film Video Player"
        src={
          type === "movie"
            ? getMovieEmbed(film?.detail?.id)
            : getTvEmbed(
                film?.detail?.id,
                tvVideo.season_number,
                tvVideo.episode_number
              )
        }
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Video;

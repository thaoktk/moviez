import React, { useState } from "react";
import Comment from "../../components/Comment";
import DetailFilmWatching from "../../components/DetailFilmWatching";
import Similar from "../../components/Similar";
import TvEpisode from "../../components/TvEpisode";
import Video from "../../components/Video";

function FilmWatch() {
  const [type, setType] = useState("tv");
  return (
    <div className="lg:px-8 px-5 py-5 flex lg:flex-row flex-col items-start justify-between gap-6">
      <div className="lg:flex-[3_3_0%] flex-1">
        <Video />
        <DetailFilmWatching />
        <Comment />
      </div>
      {(type === "movie" && <Similar />) || <TvEpisode />}
    </div>
  );
}

export default FilmWatch;

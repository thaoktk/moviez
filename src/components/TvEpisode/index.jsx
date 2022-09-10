import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getTvVideo } from "../../shared/actions";
import { alternativeImage } from "../../shared/constant";
import { getImage } from "../../shared/utils";
import useTvVideoStore from "../../store/tvVideo";

function TvEpisode({ film }) {
  const { tvVideo, setTvVideo } = useTvVideoStore();
  const [seasonList, setSeasonList] = useState([]);

  useEffect(() => {
    getTvVideo(film?.detail?.seasons, film?.detail?.id).then(async (res) => {
      if (res) {
        const list = await Promise.all([...res]);
        setSeasonList(list);
      }
    });
  }, [film?.detail?.id, film?.detail?.seasons]);

  return (
    <div className="w-full lg:px-8 flex-1 lg:border-l border-1 border-white/10">
      <h3 className="mb-5 text-2xl text-white font-semibold">Season</h3>
      <Accordion allowMultiple className=" max-h-[1000px] overflow-y-auto">
        <ul className="">
          {seasonList.map((season) => (
            <li key={season.id} className="mb-3 rounded-md">
              <AccordionItem className="border-none">
                <AccordionButton className="flex !items-start">
                  <LazyLoadImage
                    className="w-[80px] h-[120px] object-cover rounded-lg mr-4"
                    src={
                      season?.poster_path
                        ? getImage("original", season?.poster_path)
                        : alternativeImage
                    }
                    alt={season.name}
                  />
                  <div className="">
                    <p
                      className={`${
                        season.season_number === tvVideo.season_number &&
                        "!text-red"
                      } text-xl text-white text-start font-normal`}
                    >
                      {season.name}
                    </p>
                    <p className="mt-3 text-xl text-white text-start font-normal">
                      Episode: {season.episode_count}
                    </p>
                  </div>
                  <AccordionIcon className="ml-auto text-xl !text-white" />
                </AccordionButton>
                <AccordionPanel>
                  <ul className="mt-3">
                    {season?.episodes?.map((episode) => (
                      <li
                        key={episode.id}
                        onClick={() =>
                          setTvVideo({
                            season_number: season.season_number,
                            episode_number: episode.episode_number,
                          })
                        }
                        className={`
                        ${
                          season.season_number === tvVideo.season_number &&
                          episode.episode_number === tvVideo.episode_number
                            ? "bg-white/30"
                            : ""
                        }
                        mb-5 p-3 flex items-center rounded-lg hover:bg-white/30 transition-all`}
                      >
                        <span className="mr-5 text-lg text-white font-medium">
                          {episode?.episode_number}
                        </span>
                        <div className="flex items-center">
                          <LazyLoadImage
                            className="max-w-[150px] h-[60px] object-cover rounded-md mr-4"
                            src={
                              episode?.still_path
                                ? getImage("original", episode?.still_path)
                                : alternativeImage
                            }
                            alt={episode.name}
                          />
                          <p className="text-xs text-white/70">
                            {episode.name}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </AccordionPanel>
              </AccordionItem>
            </li>
          ))}
        </ul>
      </Accordion>
    </div>
  );
}

export default TvEpisode;

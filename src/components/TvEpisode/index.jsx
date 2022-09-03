import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { v4 } from "uuid";

const seasons = [
  {
    name: "Stranger things 1",
    episode: 8,
  },
  {
    name: "Stranger things 2",
    episode: 9,
  },
  {
    name: "Stranger things 3",
    episode: 10,
  },
  {
    name: "Stranger things 4",
    episode: 8,
  },
];

function TvEpisode() {
  return (
    <div className="w-full lg:px-8 flex-1 lg:border-l border-1 border-white/10">
      <h3 className="mb-5 text-2xl text-white font-semibold">Season</h3>
      <Accordion allowMultiple className=" max-h-[1000px] overflow-y-auto">
        <ul className="">
          {seasons.map((item) => (
            <li key={v4()} className="mb-3 rounded-md">
              <AccordionItem className="border-none">
                <AccordionButton className="flex !items-start">
                  <Image
                    className="w-[80px] h-[120px] rounded-lg mr-4"
                    objectFit="cover"
                    src="https://resizing.flixster.com/0xxuABVVuzJrUT130WFHKE-irEg=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vNzUyMTFhOTktZTU4Ni00ODkyLWJlYjQtZTgxYTllZmU2OGM0LmpwZw=="
                    alt="Dan Abramov"
                  />
                  <div className="">
                    <p className="text-xl text-white font-normal">
                      {item.name}
                    </p>
                    <p className="mt-3 text-xl text-white text-start font-normal">
                      Episode: {item.episode}
                    </p>
                  </div>
                  <AccordionIcon className="ml-auto text-xl !text-white" />
                </AccordionButton>
                <AccordionPanel>
                  <ul className="mt-3">
                    {new Array(8).fill(null).map(() => (
                      <li
                        key={v4()}
                        className="mb-5 p-3 flex items-center rounded-lg hover:bg-white/30 transition-all"
                      >
                        <span className="mr-5 text-lg text-white font-medium">
                          1
                        </span>
                        <div className="flex items-center">
                          <Image
                            className="w-[150px] h-[60px] rounded-md mr-4"
                            objectFit="cover"
                            src="https://m.media-amazon.com/images/M/MV5BNDQ4YTU2MTAtN2ZkYi00NmRhLTg5NDYtNWIxYjIxOTJkMjcyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg"
                            alt="Dan Abramov"
                          />
                          <p className="text-xs text-white/70">
                            Chapter One: The Vanishing of Will Byers
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

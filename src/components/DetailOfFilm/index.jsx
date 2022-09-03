import { Avatar, Image } from "@chakra-ui/react";
import { useState } from "react";
import { BiPlay } from "react-icons/bi";
import { BsFillHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { v4 } from "uuid";

const casts = [
  {
    name: "Edward Norton",
    char: "The Narrator",
  },
  {
    name: "Brad Pitt",
    char: "Tyler Durden",
  },
  {
    name: "Helena Bonham Carter",
    char: "Marla Singer",
  },
  {
    name: "Meat Loaf",
    char: 'Robert "Bob" Paulson',
  },
  {
    name: "Jared Leto",
    char: "Angel Face",
  },
  {
    name: "Jared Leto",
    char: "Angel Face",
  },
  {
    name: "Jared Leto",
    char: "Angel Face",
  },
  {
    name: "Jared Leto",
    char: "Angel Face",
  },
];

const text =
  'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion';

function DetailOfFilm() {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="lg:px-8 flex-[3_3_0%]">
      <div className="flex md:flex-row flex-col md:items-start items-center justify-start">
        <Image
          className="w-[150px] h-[200px] rounded-lg md:mr-8"
          objectFit="cover"
          src="https://resizing.flixster.com/0xxuABVVuzJrUT130WFHKE-irEg=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vNzUyMTFhOTktZTU4Ni00ODkyLWJlYjQtZTgxYTllZmU2OGM0LmpwZw=="
          alt="Dan Abramov"
        />
        <div className="md:mt-0 mt-8">
          <h2 className="text-4xl text-white text-center font-semibold">
            Stranger Things
          </h2>
          <ul className="mt-5 flex items-center gap-3">
            {["Drama", "Action", "Fiction"].map((item) => (
              <li
                className="text-lg text-white/60 px-3 py-1 rounded-full border border-1 border-gray-400 hover:text-white hover:border-white transition-all"
                key={item}
              >
                <Link to="/category">{item}</Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center gap-4">
            <Link
              to={`/movie/:slug/watch`}
              className="px-8 py-2 flex items-center justify-between gap-5 bg-red rounded-full hover:bg-red/80 transition-all"
            >
              <BiPlay className="text-xl text-white" />
              <span className="text-lg text-white font-semibold">WATCH</span>
            </Link>
            <button className="p-3 w-[50px] h-[50px] flex items-center justify-center border border-1 rounded-full">
              <BsFillHeartFill className="text-lg text-white" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 flex lg:flex-row flex-col items-start justify-between gap-8">
        <p className="lg:w-fit w-full text-3xl text-white text-center font-thin leading-snug">
          1999 <br /> 139 Min
        </p>
        <div>
          <h3 className="text-2xl text-white font-semibold">Story Line</h3>
          <p className="mt-6 lg:max-w-[500px] text-white text-justify">
            {showMore ? text : `${text.substring(0, 250)} ...`}
            <button
              onClick={() => setShowMore((prev) => !prev)}
              className="ml-3 italic hover:text-red transition-all"
            >
              {(showMore && "Show less") || "Show more"}
            </button>
          </p>
        </div>
        <div>
          <h3 className="text-2xl text-white font-semibold">Cast</h3>
          <ul className="mt-6 flex lg:flex-col flex-row flex-wrap items-start lg:gap-6 gap-10">
            {casts.map((item) => (
              <li key={v4()} className="flex items-center">
                <Avatar
                  src="https://netflixjunkie.com/wp-content/uploads/2022/04/MILLIE20BOBBY20BROWN2023022220GettyImages-1181658879a-1140x600.webp"
                />
                <div className="ml-4">
                  <p className="text-lg text-red font-medium">{item.name}</p>
                  <p className="text-white">{item.char}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DetailOfFilm;

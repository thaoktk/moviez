import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SliderSection from "../../components/SliderSection";
import SliderTopHome from "../../components/SliderTopHome";

function Home() {
  const location = useLocation();
  const [type, setType] = useState("movie");

  useEffect(() => {
    if (location.pathname === "/") {
      setType("movie");
    } else if (location.pathname === "/tv") {
      setType("tv");
    }
  }, [location.pathname]);

  return (
    <div className="flex-1">
      <SliderTopHome type={type} />
      <SliderSection type={type} paramSearch="popular" heading="Popular" />
      <SliderSection type={type} paramSearch="top_rated" heading="Top Rated" />
      <SliderSection type={type} paramSearch="trending" heading="Trending" />
      <SliderSection type={type} paramSearch="upcoming" heading="Upcoming" />
    </div>
  );
}

export default Home;

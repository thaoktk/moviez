import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import ListFilm from "../../components/ListFilm";
import SubSidebar from "../../components/SubSidebar";

function Profile() {
  return (
    <div className="lg:px-8 px-5 py-5 flex lg:flex-row flex-col justify-start items-start">
      <SubSidebar />
      <div className="lg:mt-0 mt-5">
        <button className="px-5 py-2 flex items-center text-lg text-red hover:bg-red/20 transition-all rounded-full">
          <BsFillTrashFill className="mr-4" />
          <span>Clear</span>
        </button>
        <div className="mt-5">
          <ListFilm />
        </div>
      </div>
    </div>
  );
}

export default Profile;

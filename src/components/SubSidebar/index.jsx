import React, { useState } from "react";

function SubSidebar() {
  const [activeTab, setActiveTab] = useState("favorite");
  return (
    <ul className="lg:px-8 lg:w-fit w-full flex lg:flex-col flex-row items-center lg:justify-start justify-center">
      <li
        onClick={() => setActiveTab("favorite")}
        className={`${
          (activeTab === "favorite" && "!text-red !bg-white/10") || ""
        } lg:mb-3 lg:mr-0 mr-3 px-5 py-2 md:w-[200px] w-full text-lg text-white bg-transparent hover:text-red hover:bg-white/20 rounded-lg transition-all`}
      >
        Favorite
      </li>
      <li
        onClick={() => setActiveTab("history")}
        className={`${
          (activeTab === "history" && "!text-red !bg-white/10") || ""
        } px-5 py-2 md:w-[200px] w-full text-lg text-white bg-transparent hover:text-red hover:bg-white/20 rounded-lg transition-all`}
      >
        History
      </li>
    </ul>
  );
}

export default SubSidebar;

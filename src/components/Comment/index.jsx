import { Avatar } from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineMore } from "react-icons/ai";
import { RiSendPlaneFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { v4 } from "uuid";

function Comment() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="mt-8 md:px-5">
      <p className="text-2xl text-white font-medium">
        Comment <span className="text-white/50">(4)</span>
      </p>
      {(!isLogin && (
        <div className="mt-3 flex justify-center">
          <p className="text-lg text-white">
            You need to{" "}
            <Link to="/login" className="text-red font-medium">
              Login
            </Link>{" "}
            to comment
          </p>
        </div>
      )) || (
        <form className="mt-5 flex items-center">
          <Avatar
            name="Oshigaki Kisame"
            src="https://netflixjunkie.com/wp-content/uploads/2022/04/MILLIE20BOBBY20BROWN2023022220GettyImages-1181658879a-1140x600.webp"
          />
          <input
            type="text"
            placeholder="Comment"
            className="ml-4 px-5 py-2 w-full text-white bg-white/10 rounded-full outline-none"
          />
          <button className="ml-3 px-3">
            <RiSendPlaneFill className="text-4xl text-red" />
          </button>
        </form>
      )}
      <ul className="mt-8">
        {new Array(4).fill(null).map(() => (
          <li key={v4()} className="mb-8 flex items-start">
            <Avatar
              name="Oshigaki Kisame"
              src="https://netflixjunkie.com/wp-content/uploads/2022/04/MILLIE20BOBBY20BROWN2023022220GettyImages-1181658879a-1140x600.webp"
            />
            <div className="ml-4">
              <p className="text-lg text-white font-medium">Thảo Trần</p>
              <p className="mt-1 text-white/90">hello anh em</p>
              <p className="mt-2 text-white/70">4 minutes</p>
            </div>
            <div className="ml-6">
              <button>
                <AiOutlineMore className="text-xl text-white/90" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comment;

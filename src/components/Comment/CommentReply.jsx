import { Avatar } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { addDocument } from "../../firebase/service";
import useAuthStore from "../../store/auth";

function CommentReply() {
  const { id } = useParams();
  const { currentUser } = useAuthStore();
  const [commentValue, setCommentValue] = useState("");

  const handleAddComment = (e) => {
    e.preventDefault();

    if (commentValue.length > 0) {
      addDocument("comments", {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        comment: commentValue,
        filmId: id,
      });

      setCommentValue("");
    }
  };
  return (
    <div className="mt-4 flex items-start">
      <Avatar name={currentUser.displayName} src={currentUser.photoURL} />
      <div className="ml-4">
        <p className="text-lg text-white font-medium">
          {currentUser.displayName}
        </p>
        <form onSubmit={handleAddComment} className="mt-3 flex items-center">
          <input
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            type="text"
            placeholder="Comment"
            className="px-5 py-2 w-full text-white bg-white/10 rounded-full outline-none"
          />
          <button type="submit" className="ml-3 px-3">
            <RiSendPlaneFill className="text-4xl text-red" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommentReply;

import { Avatar } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import { addDocument, deleteDocument } from "../../firebase/service";
import useCollections from "../../hooks/useCollections";
import useAuthStore from "../../store/auth";
import CommentUser from "./CommentUser";

function Comment() {
  const { id } = useParams();
  const { currentUser } = useAuthStore();
  const [commentValue, setCommentValue] = useState("");

  const commentCondition = useMemo(() => {
    return {
      fieldName: "filmId",
      operator: "==",
      compareValue: id,
    };
  }, [id]);

  const comments = useCollections("comments", commentCondition);

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

  const handleDeleteComment = (commentId) => {
    deleteDocument("comments", commentId);
  };

  return (
    <div className="mt-8 md:px-5">
      <p className="text-2xl text-white font-medium">
        Comment <span className="text-white/50">({comments.length})</span>
      </p>
      {(!currentUser.uid && (
        <div className="mt-3 flex justify-center">
          <p className="text-lg text-white">
            You need to{" "}
            <Link to={`/login`} className="text-red font-medium">
              Login
            </Link>{" "}
            to comment
          </p>
        </div>
      )) || (
        <form onSubmit={handleAddComment} className="mt-5 flex items-center">
          <Avatar name={currentUser.displayName} src={currentUser.photoURL} />
          <input
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            type="text"
            placeholder="Comment"
            className="ml-4 px-5 py-2 w-full text-white bg-white/10 rounded-full outline-none"
          />
          <button type="submit" className="ml-3 px-3">
            <RiSendPlaneFill className="text-4xl text-red" />
          </button>
        </form>
      )}
      <ul className="mt-8 max-h-[700px] overflow-y-auto">
        {comments.map((comment) => (
          <li key={comment.id} className="mb-8">
            <CommentUser
              comment={comment}
              handleDeleteComment={handleDeleteComment}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comment;

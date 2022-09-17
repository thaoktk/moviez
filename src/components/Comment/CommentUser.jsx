import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import { AiOutlineMore } from "react-icons/ai";
import {
  BsFillEmojiAngryFill,
  BsFillEmojiHeartEyesFill,
  BsXLg,
} from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";
import { deleteDocument, updateDocument } from "../../firebase/service";
import useToastify from "../../hooks/useToastify";
import useAuthStore from "../../store/auth";

function CommentUser({ comment, role = "parent" }) {
  const { currentUser } = useAuthStore();
  const [commentValue, setCommentValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [commentEdit, setCommentEdit] = useState(0);

  const showToast = useToastify();

  const handleDeleteComment = (commentId) => {
    deleteDocument("comments", commentId);
  };

  const handleUpdateContentComment = (e, commentId) => {
    e.preventDefault();

    if (commentValue.length > 0) {
      updateDocument("comments", commentId, {
        comment: commentValue,
        isEdited: true,
      });

      setCommentValue("");
      setIsEditing(false);
    } else {
      showToast({
        title: "Error.",
        description: "You must type something.",
        status: "error",
      });
    }
  };

  const handleLikeComment = (commentId) => {
    if (currentUser.uid) {
      if (comment.likes.length <= 0) {
        if (comment.unLikes.some((unLike) => unLike === currentUser.uid)) {
          updateDocument("comments", commentId, {
            likes: [currentUser.uid],
            unLikes: comment.unLikes.filter(
              (unLike) => unLike !== currentUser.uid
            ),
          });
        } else {
          updateDocument("comments", commentId, {
            likes: [currentUser.uid],
          });
        }
      } else {
        if (comment.likes.some((like) => like === currentUser.uid)) {
          updateDocument("comments", commentId, {
            likes: comment.likes.filter((like) => like !== currentUser.uid),
          });
        } else {
          if (comment.unLikes.some((unLike) => unLike === currentUser.uid)) {
            updateDocument("comments", commentId, {
              likes: [...comment.likes, currentUser.uid],
              unLikes: comment.unLikes.filter(
                (unLike) => unLike !== currentUser.uid
              ),
            });
          } else {
            updateDocument("comments", commentId, {
              likes: [...comment.likes, currentUser.uid],
            });
          }
        }
      }
    } else {
      showToast({
        title: "Error.",
        description: "You must login to like/dislike this comment.",
        status: "error",
      });
    }
  };

  const handleUnLikeComment = (commentId) => {
    if (currentUser.uid) {
      if (comment.unLikes.length <= 0) {
        if (comment.likes.some((like) => like === currentUser.uid)) {
          updateDocument("comments", commentId, {
            unLikes: [currentUser.uid],
            likes: comment.likes.filter((like) => like !== currentUser.uid),
          });
        } else {
          updateDocument("comments", commentId, {
            unLikes: [currentUser.uid],
          });
        }
      } else {
        if (comment.unLikes.some((unLike) => unLike === currentUser.uid)) {
          updateDocument("comments", commentId, {
            unLikes: comment.unLikes.filter(
              (unLike) => unLike !== currentUser.uid
            ),
          });
        } else {
          if (comment.likes.some((like) => like === currentUser.uid)) {
            updateDocument("comments", commentId, {
              unLikes: [...comment.unLikes, currentUser.uid],
              likes: comment.likes.filter((like) => like !== currentUser.uid),
            });
          } else {
            updateDocument("comments", commentId, {
              unLikes: [...comment.unLikes, currentUser.uid],
            });
          }
        }
      }
    } else {
      showToast({
        title: "Error.",
        description: "You must login to like/dislike this comment.",
        status: "error",
      });
    }
  };

  return (
    <div className="flex items-start">
      <Avatar size="sm" name={comment.displayName} src={comment.photoURL} />
      <div className="ml-4">
        <div className="flex">
          <p className="text-lg text-white font-medium">
            {comment.displayName}
          </p>
          <p className="ml-3 mt-1 text-sm text-white/70">
            {moment(
              new Date(comment?.createdAt?.seconds * 1000),
              "YYYYMMDD"
            ).fromNow()}
          </p>
        </div>
        {isEditing && commentEdit === comment.id ? (
          <form
            onSubmit={(e) => handleUpdateContentComment(e, comment.id)}
            className="mt-3 flex items-center"
          >
            <input
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              type="text"
              placeholder="Edit comment"
              className="px-5 py-2 w-full text-white bg-white/10 rounded-full outline-none"
            />
            <button type="submit" className="ml-3 px-3">
              <RiSendPlaneFill className="text-2xl text-red" />
            </button>
            <button onClick={() => setIsEditing(false)} className="px-3">
              <BsXLg className="text-2xl text-red" />
            </button>
          </form>
        ) : (
          <p className="mt-1 text-white/90">{comment.comment}</p>
        )}
        <div className="mt-2 flex items-center">
          <div className="flex items-center">
            <p className="mr-2 text-sm text-white/70">
              {comment?.likes?.length}
            </p>
            <button onClick={() => handleLikeComment(comment.id)} className="">
              <BsFillEmojiHeartEyesFill
                className={`${
                  (comment?.likes?.some((like) => like === currentUser.uid) &&
                    "!text-red") ||
                  ""
                } text-sm text-white/70 hover:text-red transition-all`}
              />
            </button>
          </div>
          <div className="ml-3 flex items-center">
            <p className="mr-2 text-sm text-white/70">
              {comment?.unLikes?.length}
            </p>
            <button onClick={() => handleUnLikeComment(comment.id)}>
              <BsFillEmojiAngryFill
                className={`${
                  (comment?.unLikes?.some(
                    (unLike) => unLike === currentUser.uid
                  ) &&
                    "!text-red") ||
                  ""
                } text-sm text-white/70 hover:text-red transition-all`}
              />
            </button>
          </div>
          <p className="ml-2 text-sm text-white/70">
            {comment.isEdited ? "Edited" : ""}
          </p>
        </div>
      </div>
      {currentUser.uid === comment.uid && (
        <div className="ml-6">
          <Menu className="">
            <MenuButton>
              <AiOutlineMore className="text-xl text-white/90" />
            </MenuButton>
            <MenuList className="!relative !z-50 !bg-gray-800 !border-gray-800">
              <MenuItem
                onClick={() => {
                  setCommentEdit(comment.id);
                  setIsEditing(true);
                }}
                className="!text-white hover:!bg-gray-600 focus:!bg-gray-600"
              >
                <span>Edit</span>
              </MenuItem>
              <MenuItem
                onClick={() => handleDeleteComment(comment.id)}
                className="w-full !text-white hover:!bg-gray-600 focus:!bg-gray-600"
              >
                <span>Delete</span>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      )}
    </div>
  );
}

export default CommentUser;

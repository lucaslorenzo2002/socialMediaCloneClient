import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RepeatIcon from "@mui/icons-material/Repeat";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import ModalTweet from "../modalTweet/ModalTweet";
import { Link } from "react-router-dom";
import axios from "axios";
import CONFIG from "../../constants/config";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const Tweet = ({
  tweetId,
  fullName,
  content,
  user,
  userId,
  likes = [],
  retweets = [],
  comments = [],
  profile = "/defaultProfileImg.png",
  isLiked,
  onToggleLike,
  isRetweet,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localCommentCount, setLocalCommentCount] = useState(comments.length);
  const [localLikesCount, setLocalLikesCount] = useState(likes.length);

  const handleNewComment = (newComment) => {
    comments.push(newComment);
    setLocalCommentCount(localCommentCount + 1);
  };

  const globalUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const handleLike = () => {
    if (!isLiked) {
      axios
        .post(
          `${CONFIG.BASE_URL}/likepost/${tweetId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          onToggleLike(tweetId);
          setLocalLikesCount(localLikesCount + 1);
        })
        .catch((e) => {
          console.log(e);
          toast.error("Error al Likear Tweet");
          return;
        });
    } else {
      const likeId = likes.find((like) => like.user_id === globalUser.id)?.id;
      if (likeId) {
        axios
          .post(
            `${CONFIG.BASE_URL}/removelike/${likeId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            setLocalLikesCount(localLikesCount - 1);
            onToggleLike(tweetId);
          })
          .catch((e) => {
            console.log(e);
            toast.error("Error al quitar el like al tweet");
            return;
          });
      } else {
        toast.error("No se encontró el like para eliminar");
      }
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex p-4 space-x-4 border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200">
        {/* Imagen de perfil */}
        <Link to={`/profile/${userId}`}>
          <img
            src={profile}
            alt={`${fullName}'s profile`}
            className="aspect-square w-12 rounded-full object-cover"
          />
        </Link>

        {/* Contenido principal del tweet */}
        <div className="flex-1">
          <div className="flex">
            <Link
              to={`/profile/${userId}`}
              className="flex items-center space-x-2 mb-2"
            >
              <div className="font-bold">{fullName}</div>
              <div className="text-slate-400">{user}</div>
            </Link>
            {isRetweet && (
              <div className="flex-1 text-end text-sm text-slate-400">
                <RepeatIcon className="max-w-[18px]"/>
                <span className="italic ml-1">
                  Retweeted
                </span>
              </div>
            )}
          </div>

          <p>{content}</p>
          {/* Iconos de interacción */}
          <div className="flex gap-x-4 mt-2 text-slate-400">
            <div className="flex gap-1">
              <ChatBubbleOutlineIcon
                className="cursor-pointer hover:text-blue-500 max-w-[18px]"
                onClick={openModal}
              />
              <span>{localCommentCount}</span>
            </div>
            <div className="flex gap-1">
              <RepeatIcon className="cursor-pointer hover:text-green-500 max-w-[18px]" />
              <span>{retweets.length}</span>
            </div>
            <div className="flex gap-1">
              {isLiked ? (
                <FavoriteIcon
                  className="cursor-pointer text-red-500 max-w-[18px]"
                  onClick={(e) => handleLike()}
                />
              ) : (
                <FavoriteBorderIcon
                  className="cursor-pointer hover:text-red-500 max-w-[18px]"
                  onClick={(e) => handleLike()}
                />
              )}

              <span>{localLikesCount}</span>
            </div>
          </div>
        </div>
      </div>
      <ModalTweet
        isOpen={isModalOpen}
        onClose={closeModal}
        tweet={{ user, content, profile, fullName, tweetId }}
        comments={comments}
        retweets={retweets}
        likes={localLikesCount}
        isLiked={isLiked}
        onToggleLike={handleLike}
        onNewComment={handleNewComment}
      />
    </>
  );
};

export default Tweet;

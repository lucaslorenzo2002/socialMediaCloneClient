import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RepeatIcon from "@mui/icons-material/Repeat";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import ModalTweet from "../modalTweet/ModalTweet";
import { Link } from "react-router-dom";

const Tweet = ({
  tweetId,
  fullName,
  content,
  user,
  userId,
  likes = 0,
  retweets = [],
  comments = [],
  profile = "/defaultProfileImg.png",
  isLiked,
  onToggleLike,
  onNewComment,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localCommentCount, setLocalCommentCount] = useState(comments.length);


  const handleNewComment = (newComment) => {
    setLocalCommentCount(localCommentCount + 1);
  };

  const handleLike = () => {
    onToggleLike(tweetId);
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
          <Link
            to={`/profile/${userId}`}
            className="flex items-center space-x-2 mb-2"
          >
            <div className="font-bold">{fullName}</div>
            <div className="text-slate-400">{user}</div>
          </Link>
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

              <span>{isLiked ? likes + 1 : likes}</span>
            </div>
          </div>
        </div>
      </div>
      <ModalTweet
        isOpen={isModalOpen}
        onClose={closeModal}
        tweet={{ user, content, profile }}
        comments={comments}
        retweets={retweets}
        likes={likes}
        tweetId={tweetId}
        isLiked={isLiked}
        onToggleLike={handleLike}
        onNewComment={handleNewComment}
      />
    </>
  );
};

export default Tweet;

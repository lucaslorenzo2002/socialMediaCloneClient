import React, { useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const TweetGuardado = ({ user, username, content, tweetId, userId }) => {
  const [isSaved, setIsSaved] = useState(true);

  const handleClickSave = () => {
    setIsSaved(!isSaved);

  };
  return (
    <div className="flex space-x-4 mb-4 border-b pb-4 items-center ">
      <img
        src="/defaultProfileImg.png"
        alt="User"
        className="w-12 h-12 rounded-full"
      />
      <div className="flex-1">
        <div className="flex items-center">
          <span className="font-bold">{user}</span>
          <span className="ml-2 text-gray-500">{username}</span>
        </div>
        <p>{content}</p>
      </div>
      {isSaved ? (
        <BookmarkIcon className="cursor-pointer" onClick={handleClickSave} />
      ) : (
        <BookmarkBorderIcon
          className="cursor-pointer"
          onClick={handleClickSave}
        />
      )}
    </div>
  );
};

export default TweetGuardado;

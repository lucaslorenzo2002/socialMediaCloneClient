import React, { useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import axios from "axios";
import toast from "react-hot-toast";
import CONFIG from "../../constants/config";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TweetGuardado = ({
  user,
  username,
  content,
  tweetId,
  userId,
  file = null,
}) => {
  const [isSaved, setIsSaved] = useState(true);

  const token = useSelector((state) => state.token);

  const handleClickSave = () => {
    if (!isSaved) {
      axios
        .post(
          `${CONFIG.BASE_URL}/agregaraguardados/${tweetId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setIsSaved(!isSaved);
          toast.success("Tweet guardado con éxito");
        })
        .catch((e) => {
          console.log(e);
          toast.error("Error al Likear Tweet");
          return;
        });
    } else {
      axios
        .post(
          `${CONFIG.BASE_URL}/eliminardeguardados/${tweetId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setIsSaved(!isSaved);
          toast.success("Tweet eliminado de guardados con éxito");
        })
        .catch((e) => {
          console.log(e);
          toast.error("Error al eliminar Tweet de guardados");
          return;
        });
    }
  };

  return (
    <div className="mb-4 border-b pb-4">
      <div className="flex space-x-4 items-start">
        <Link className="object-cover w-14 aspect-square" to={`/profile/${userId}`}>
        <img
          src="/defaultProfileImg.png"
          onError={(e) => {
            e.target.src = "/defaultProfileImg.png";
          }}
          alt="User"
          className="w-12 h-12 rounded-full"
        /></Link>
        <div className="flex-col w-full">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center">
                <Link to={`/profile/${userId}`} className="font-bold">{user}</Link>
                <Link to={`/profile/${userId}`} className="ml-2 text-gray-500">{username}</Link>
              </div>
              <p>{content}</p>
            </div>
            {isSaved ? (
              <BookmarkIcon
                className="cursor-pointer"
                onClick={handleClickSave}
              />
            ) : (
              <BookmarkBorderIcon
                className="cursor-pointer"
                onClick={handleClickSave}
              />
            )}
          </div>
          {file && (
            <img
              src={file}
              alt={tweetId + "image"}
              className="mt-2 rounded-md "
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TweetGuardado;

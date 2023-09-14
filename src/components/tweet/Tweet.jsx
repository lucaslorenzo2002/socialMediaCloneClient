import React, { useEffect, useRef, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RepeatIcon from "@mui/icons-material/Repeat";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BsFillTrashFill from "@mui/icons-material/Delete";

import ModalTweet from "../modalTweet/ModalTweet";
import { Link } from "react-router-dom";
import axios from "axios";
import CONFIG from "../../constants/config";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

import "./Tweet.css"

const Tweet = ({
  retweetUser,
  retweetUserId,
  tweetId,
  fullName,
  content,
  user,
  userId,
  likes = [],
  comments = [],
  profile = "/defaultProfileImg.png",
  isLiked,
  onToggleLike,
  isRetweet,
  retweets = [],
  isUserProfile = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localCommentCount, setLocalCommentCount] = useState(comments.length);
  const [localLikesCount, setLocalLikesCount] = useState(likes.length);
  const globalUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [isRetweetedState, setIsRetweetedState] = useState(false);

  const [localRetweetCount, setLocalRetweetCount] = useState(retweets.length);

  function isUserARetweeter(data) {
    for (let item of data) {
      if (item.user_id && item.user_id === globalUser.id) {
        return true;
      }
      if (item.Post && Array.isArray(item.Post.Retweets)) {
        for (let retweet of item.Post.Retweets) {
          if (retweet.user_id === globalUser.id) {
            return true;
          }
        }
      }
    }
    return false;
  }

  useEffect(() => {
    setIsRetweetedState(isUserARetweeter(retweets));
  }, [retweets]);

  const handleRetweet = () => {
    if(globalUser.id === userId) return toast.error("No puedes retuitear tus propios tweets");
    axios
      .post(
        `${CONFIG.BASE_URL}/retuitear/${tweetId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        onToggleRetweet(tweetId);
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error al retweetear");
      });
  };

  const onToggleRetweet = (tweetId) => {
    if (isUserARetweeter(retweets) && isRetweetedState) {
      setLocalRetweetCount(localRetweetCount - 1);
      setIsRetweetedState(false);
      retweets = retweets.filter(
        (retweet) => retweet.user_id !== globalUser.id
      );
    } else {
      setLocalRetweetCount(localRetweetCount + 1);
      setIsRetweetedState(true);
      toast.success("Retweeteado con éxito");
      retweets.push({
        user_id: globalUser.id,
        Post: {
          id: tweetId,
        },
      });
    }
  };

  const handleNewComment = (newComment) => {
    comments.push(newComment);
    setLocalCommentCount(localCommentCount + 1);
  };

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

  const refTuit = useRef(null);

  const handleDeleteTweet = async (tweetId) => {


    // Pregunta al usuario si está seguro de eliminar el tweet con SweetAlert2
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, borrar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(
            `${CONFIG.BASE_URL}/eliminarpost/${tweetId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          toast.success("Tweet eliminado con éxito");
          refTuit.current.classList.value = "vanish flex p-4 space-x-4 border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200";
        } catch (error) {
          toast.error("Error al eliminar el tweet");
          console.log(error);
        }
      }
    });
  };

  return (
    <>
      <div
        ref={refTuit}
        className="flex p-4 space-x-4 border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200"
      >
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
                <RepeatIcon className="max-w-[16px]" />
                <Link
                  to={`/profile/${retweetUserId}`}
                  className="hover:underline ml-1"
                >
                  {retweetUser ? `${retweetUser}` : "Retweet"}
                </Link>
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
              <RepeatIcon
                className={`cursor-pointer hover:text-green-500 max-w-[18p] ${
                  isRetweetedState ? "text-green-500" : ""
                }`}
                onClick={handleRetweet}
              />
              <span>{localRetweetCount}</span>
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
            {isUserProfile && (
              <div className="flex flex-1 justify-end">
                <BsFillTrashFill
                  className={`cursor-pointer hover:text-red-600 max-w-[18px]`}
                  onClick={() => handleDeleteTweet(tweetId)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <ModalTweet
        isOpen={isModalOpen}
        onClose={closeModal}
        tweet={{ user, content, profile, fullName, tweetId }}
        comments={comments}
        likes={localLikesCount}
        isLiked={isLiked}
        onToggleLike={handleLike}
        onNewComment={handleNewComment}
        onToggleRetweet={handleRetweet}
        retweets={localRetweetCount}
        isRetweeted={isRetweetedState}
      />
    </>
  );
};

export default Tweet;

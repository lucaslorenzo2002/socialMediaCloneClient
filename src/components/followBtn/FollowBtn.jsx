import axios from "axios";
import React, { useState } from "react";
import CONFIG from "../../constants/config";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const FollowBtn = ({ isFollowing = false, profileData = null, onClick }) => {
  const followBtnText = isFollowing ? "Unfollow" : "Follow";
  const [btnText, setBtnText] = useState(followBtnText);
  const [isFollowingState, setIsFollowingState] = useState(isFollowing);
  const token = useSelector((state) => state.token);

  const handleFollowClick = () => {
    setBtnText("Loading...");
    axios
      .post(
        `${CONFIG.BASE_URL}/seguirodejardeseguir/${profileData.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const newIsFollowing = !isFollowingState;
        setIsFollowingState(newIsFollowing);
        setBtnText(newIsFollowing ? "Unfollow" : "Follow");
        onClick(newIsFollowing); // Llamar a la función de callback

        newIsFollowing
          ? toast.success(`Has seguido a ${profileData.username}`)
          : toast.success(`Has dejado de seguir a ${profileData.username}`);
      })
      .catch((error) => {
        toast.error("Se ha producido un error");
        console.error("There was a problem with the fetch operation:", error);
        setBtnText(isFollowingState ? "Unfollow" : "Follow");
      });
  };

  return (
    <div className="mt-4 flex space-x-8">
      <button
        className={`px-4 py-2 ${
          isFollowingState
            ? "bg-transparent  border-blue-500 text-blue-500"
            : "bg-blue-500 border-blue-500 text-white"
        } rounded-full border-2`}
        onClick={handleFollowClick}
      >
        {btnText}
      </button>
    </div>
  );
};

export default FollowBtn;

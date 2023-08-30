import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import CONFIG from "../../constants/config";
import FollowBtn from "../../components/followBtn/FollowBtn";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${CONFIG.BASE_URL}/perfilusuario/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProfileData(response.data.data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [id, user, navigate]);

  if (!profileData) {
    return (
      <div className="flex flex-col items-center p-8 bg-white min-h-screen">
        <div>Loading Data...</div>
      </div>
    );
  }
  console.log(profileData);

  return (
    <div className="flex flex-col items-center p-8 bg-white min-h-screen">
      <img
        src={profileData?.user.profile_photo || "/defaultProfileImg.png"}
        alt={`${profileData?.user.full_name}'s profile`}
        className="rounded-full w-32 h-32 border-4 border-gray-300"
      />
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mt-4">
          {profileData?.user.full_name}
        </h1>
        <p className="text-gray-500">{profileData?.user.username}</p>
      </div>
      {profileData?.user.id !== user.id && (
        <FollowBtn isFollowing={profileData?.isFollowing} />
      )}
      <div className="mt-4 flex space-x-8">
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl font-semibold">
            {profileData.followersList?.length || 0}
          </p>
          <span>Seguidores</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl font-semibold">
            {profileData.followingList?.length || 0}
          </p>
          <span>Seguidos</span>
        </div>
      </div>
      <div className="mt-8 w-full">Tweets</div>
    </div>
  );
};

export default Profile;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import CONFIG from "../../constants/config";
import FollowBtn from "../../components/followBtn/FollowBtn";
import TweetContainer from "../../components/tweetContainer/TweetContainer";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [followers, setFollowers] = useState(0);

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
        let correctedData = { ...response.data.data };
        console.log(correctedData.FollowingList.Following);

        correctedData.isFollowing = correctedData.FollowingList.Following.some(
          (e) => e.id === user.id
        );

        // Intercambio de Seguidores y Seguidos aquí
        correctedData.CorrectedFollowers =
          correctedData.FollowingList?.Following || [];
        correctedData.CorrectedFollowing =
          correctedData.FollowersList?.Follower || [];

        setProfileData(correctedData);
        setFollowers(correctedData.CorrectedFollowers.length);
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

  const mergeAndSortByDate = (array1, array2) => {
    // Unir los dos arrays
    const combinedArray = [...array1, ...array2];

    // Ordenar por la fecha de creación
    const sortedArray = combinedArray.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateA - dateB; // Para ordenar de más antiguo a más reciente
      // return dateB - dateA; // Para ordenar de más reciente a más antiguo
    });

    return sortedArray.reverse();
  };

  const handleClickFollow = (newIsFollowing) => {
    newIsFollowing ? setFollowers(followers + 1) : setFollowers(followers - 1);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white min-h-screen">
      <img
        src={profileData?.profile_photo || "/defaultProfileImg.png"}
        alt={`${profileData?.full_name}'s profile`}
        className="rounded-full w-32 h-32 border-4 border-gray-300"
      />
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mt-4">{profileData?.full_name}</h1>
        <p className="text-gray-500">{profileData?.username}</p>
      </div>
      {profileData?.id !== user.id && (
        <FollowBtn
          profileData={profileData}
          isFollowing={profileData?.isFollowing}
          onClick={(newIsFollowing) => handleClickFollow(newIsFollowing)}
        />
      )}
      <div className="mt-4 flex space-x-8">
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl font-semibold">{followers}</p>
          <span>Seguidores</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl font-semibold">
            {profileData.CorrectedFollowing?.length || 0}
          </p>
          <span>Seguidos</span>
        </div>
      </div>
      <div className="mt-8 w-full">
        <TweetContainer
          tweets={mergeAndSortByDate(profileData.Posts, profileData.Retweets)}
          isProfile={true}
          onClick={handleClickFollow}
        />
      </div>
    </div>
  );
};

export default Profile;

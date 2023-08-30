import React, { useState } from "react";

const FollowBtn = ({isFollowing = false}) => {
  const [isFollowingState, setIsFollowingState] = useState(isFollowing);

  const handleFollowClick = () => {
    setIsFollowingState(!isFollowingState);
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
        {isFollowingState ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default FollowBtn;

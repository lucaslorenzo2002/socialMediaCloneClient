import React, { useState } from "react";
import TweetInput from "../tweetInput/tweetInput";
import Tweet from "../tweet/Tweet";

const TweetContainer = ({ tweets = [] }) => {
  const [likes, setLikes] = useState({});

  const toggleLike = (tweetId) => {
    setLikes({
      ...likes,
      [tweetId]: !likes[tweetId],
    });
  };

  if (tweets.length === 0)
    return (
      <div className="flex-1 px-2 text-center mb-10">
        <TweetInput />
        <p className="mt-10 text-slate-400">
          No hay tweets disponibles.
          <br />
          <span>Sigue a otros usuarios para ver sus twits.</span>
        </p>
      </div>
    );

  return (
    <div className="flex-1 px-2 mb-10">
      <TweetInput />
      {tweets.map((tweet) => (
        <Tweet
          tweetId={tweet.id}
          key={tweet.id}
          content={tweet.text}
          profile={"/defaultProfileImg.png"}
          fullName={tweet.User.full_name}
          user={tweet.User.username}
          userId={tweet.user_id}
          likes={tweet.Likes.length}
          comments={tweet.PostComments}
          isLiked={likes[tweet.id]}
          onToggleLike={toggleLike}
        />
      ))}
    </div>
  );
};

export default TweetContainer;

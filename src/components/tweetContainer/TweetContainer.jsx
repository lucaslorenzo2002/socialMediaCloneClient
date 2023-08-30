import React, { useState } from "react";
import TweetInput from "../tweetInput/tweetInput";
import Tweet from "../tweet/Tweet";

const TweetContainer = ({ tweets = [], isProfile = false }) => {
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

        {isProfile ? (
          <p className="mt-10 text-slate-400">
            <span>Este usuario no tiene Tweets</span>
          </p>
        ) : (
          <p className="mt-10 text-slate-400">
            No hay tweets disponibles.
            <br />
            Sigue a otros usuarios para ver sus twits.
          </p>
        )}
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

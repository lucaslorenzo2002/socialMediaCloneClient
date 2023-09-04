import React, { useState, useEffect } from "react";
import TweetInput from "../tweetInput/tweetInput";
import Tweet from "../tweet/Tweet";
import { useSelector } from "react-redux";

const TweetContainer = ({ tweets = [], isProfile = false }) => {
  const [likes, setLikes] = useState({});
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const initialLikes = {};
    tweets.forEach((tweet) => {
      initialLikes[tweet.id] = tweet.Likes.some(
        (like) => like.user_id === user.id
      );
    });
    setLikes(initialLikes);
  }, [tweets, user.id]);

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
          likes={tweet.Likes}
          comments={tweet.PostComments}
          isLiked={likes[tweet.id]}
          onToggleLike={() => toggleLike(tweet.id)}
        />
      ))}
    </div>
  );
};

export default TweetContainer;

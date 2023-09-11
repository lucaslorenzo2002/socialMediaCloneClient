import React, { useState, useEffect } from "react";
import TweetInput from "../tweetInput/tweetInput";
import Tweet from "../tweet/Tweet";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const TweetContainer = ({ tweets = [] }) => {
  const [likes, setLikes] = useState({});
  const [isProfile, setIsProfile] = useState(false);

  const user = useSelector((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/profile/")) {
      setIsProfile(true);
    } else {
      setIsProfile(false);
    }
  }, [location]);

  useEffect(() => {
    const initialLikes = {};
    tweets.forEach((tweet) => {
      const currentTweet = tweet.Post || tweet; // Considers retweet case
      initialLikes[currentTweet.id] = currentTweet.Likes.some(
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
        {!isProfile && <TweetInput />}
        {isProfile ? (
          <p className="mt-10 text-slate-400">Este usuario no tiene Tweets</p>
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
      {!isProfile && <TweetInput />}
      {tweets.map((tweet) => {
        const isRetweet = Boolean(tweet.Post);
        const currentTweet = isRetweet ? tweet.Post : tweet;
        console.log(currentTweet);

        return (
          <Tweet
            tweetId={currentTweet.id}
            key={currentTweet.id}
            content={currentTweet.text}
            profile={"/defaultProfileImg.png"}
            fullName={currentTweet.User.full_name}
            user={currentTweet.User.username}
            userId={currentTweet.User.id}
            likes={currentTweet.Likes}
            comments={currentTweet.PostComments}
            isLiked={likes[currentTweet.id]}
            onToggleLike={() => toggleLike(currentTweet.id)}
            isRetweet={isRetweet}
          />
        );
      })}
    </div>
  );
};

export default TweetContainer;

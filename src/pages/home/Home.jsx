import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import TweetContainer from "../../components/tweetContainer/TweetContainer";
import CONFIG from "../../constants/config";
import { useSelector } from "react-redux";

const Home = () => {
  const [isHome, setIsHome] = useState(false);
  const location = useLocation();
  const [tweets, setTweets] = useState([]);

  const token = useSelector((state) => state.token);

  useEffect(() => {
    axios
      .get(`${CONFIG.BASE_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((r) => {
        setTweets(r.data.data);
      });
  }, []);

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      setIsHome(false);
    } else {
      setIsHome(true);
    }
  }, [location]);

  return (
    <div>
      <TweetContainer tweets={tweets} />
    </div>
  );
};

export default Home;

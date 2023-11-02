import axios from "axios";
import TweetGuardado from "../../components/tweet/TweetGuardado";
import { useEffect, useState } from "react";
import CONFIG from "../../constants/config";
import { useSelector } from "react-redux";

const Saved = () => {
  const token = useSelector((state) => state.token);
  const [savedTweets, setSavedTweets] = useState([]);

  useEffect(() => {
    axios
      .get(`${CONFIG.BASE_URL}/guardados`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          // Check for success flag in response
          // Extract the posts from the response data
          const posts = response.data.data[0].Posts;
          setSavedTweets(posts);
        } else {
          axios.error("No se pudo cargar los tweets guardados");
          setSavedTweets([]); // or handle this scenario accordingly
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]); // Add token as a dependency

  return (
    <div className="min-h-screen">
      <h2 className="text-2xl font-bold my-5 text-center">Guardados</h2>
      {/* Lista de tweets guardados */}
      <div className="bg-white p-6 gap-2">
        {savedTweets.length === 0 && (
          <p className="text-center text-slate-400">
            No tienes ningún tweet guardados
          </p>
        )}
        {savedTweets.map((tweet) => (
          <TweetGuardado
            key={tweet.id}
            user={tweet.User.full_name}
            username={tweet.User.username}
            tweetId={tweet.id}
            userId={tweet.user_id}
            content={tweet.text}
            file={tweet.file}
          />
        ))}
      </div>
    </div>
  );
};

export default Saved;

import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import axios from "axios";
import "./TweetInput.css";

import CONFIG from "../../constants/config";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Mention, MentionsInput } from "react-mentions";

const TweetInput = ({
  isComment = false,
  tweetId = null,
  onNewComment,
  isModal = false,
}) => {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileState, setFileState] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);

  const [allUsers, setAllUsers] = useState([]); // Obtiene la lista de usuarios del estado global

  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);

  const filePickerRef = useRef(null);

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  const handleEmojiPickerClick = (e) => {
    e.stopPropagation();
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readEvent) => {
      setSelectedFile(readEvent.target.result);
    };
    setFileState(e.target.files[0]);
  };

  const handleTweet = () => {
    if (!isComment) {
      const formData = new FormData();
      formData.append("file", fileState);
      formData.append("text", input);

      console.log(formData);

      axios
        .post(`${CONFIG.BASE_URL}/crearpost`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((r) => {
          if (r.data.success) {
            toast.success("Tweet creado correctamente");
          } else {
            toast.error("Error al crear el tweet");
          }
        })
        .catch((e) => {
          console.log(e);
          toast.error("Error al crear el tweet");
        });
    } else {
      const data = {
        comment: input,
      };
      axios
        .post(`${CONFIG.BASE_URL}/${tweetId}/crearcomentario`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((r) => {
          if (r.data.success) {
            const newComment = {
              User: {
                full_name: user.full_name,
                username: user.username,
                profile_photo: user.profile_photo,
                id: user.id,
              },
              comment: input,
              Likes: [],
            };
            toast.success("Respuesta creada correctamente");
            onNewComment && onNewComment(newComment);
          } else {
            toast.error("Error al crear respuesta");
          }
        })
        .catch((e) => {
          console.log(e);
          toast.error("Error al crear respuesta");
        });
    }
    setInput("");
    setShowEmojis(false);
    setSelectedFile(null);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${CONFIG.BASE_URL}/usuarios`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const usersData = response.data.data.map((user) => ({
        id: user.id,
        display: user.username.slice(1),
        username: user.username,
        img: user.profile_photo,
      }));

      setAllUsers(usersData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={`border-b border-slate-100 p-3 flex space-x-3 mt-1`}>
      <Link to={`/profile/${user.id}`} className="w-fit h-fit object-cover">
        <img
          src={user.profile_photo || "/defaultProfileImg.png"}
          onError={(e) => {
            e.target.src = "/defaultProfileImg.png";
          }}
          alt="Profile Pic"
          className="rounded-full object-cover w-11 aspect-square"
        />
      </Link>
      <div className="w-full divide-y divide-slate-100">
        <div>
          <MentionsInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isComment ? "Add a comment..." : "What's happening?"}
            className={`${
              isComment && "resize-none"
            } bg-transparent p-2 outline-none text-lg placeholder:text-gray-500 tracking-wide w-full min-h-[50px]`}
          >
            <Mention
              trigger="@"
              data={allUsers}
              renderSuggestion={(
                suggestion,
                search,
                highlightedDisplay,
                index,
                focused
              ) => (
                <div
                  className={`user-suggestion p-2 ${
                    focused ? "focused bg-slate-100" : ""
                  }`}
                >
                  {highlightedDisplay}
                </div>
              )}
            />
          </MentionsInput>
          {selectedFile && (
            <div className="relative">
              <div
                className="absolute w-8 h-8 bg-[#15181C] hover:bg-[#272C26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                onClick={() => {
                  setSelectedFile(null);
                  setFileState(null);
                }}
              >
                <CloseIcon className="text-white h-5" />
              </div>
              <img
                src={selectedFile}
                alt="Selected File"
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}
        </div>
        <div className="flex justify-between items-center pt-2.5">
          <div className="flex items-center">
            {isComment || (
              <div className="icon">
                <InsertPhotoIcon
                  className="h-4"
                  onClick={() => {
                    filePickerRef.current.click();
                  }}
                />
                <input
                  type="file"
                  hidden
                  className=""
                  onChange={addImageToPost}
                  ref={filePickerRef}
                />
              </div>
            )}
            {!isModal && (
              <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                <EmojiEmotionsIcon className="h-4" />
                {showEmojis && (
                  <div onClick={handleEmojiPickerClick}>
                    <Picker data={data} onEmojiSelect={addEmoji} />
                  </div>
                )}
              </div>
            )}
          </div>
          <button
            onClick={handleTweet}
            className="bg-blue-500 text-white py-1 px-3 rounded-full hover:bg-blue-600 transition duration-200 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={!input.trim() && !selectedFile}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default TweetInput;

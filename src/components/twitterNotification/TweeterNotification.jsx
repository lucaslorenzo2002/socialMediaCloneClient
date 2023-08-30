import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReplyIcon from "@mui/icons-material/Reply";
import MentionIcon from "@mui/icons-material/AlternateEmail";
import PersonIcon from "@mui/icons-material/Person";
import CelebrationIcon from "@mui/icons-material/Celebration";

const TwitterNotification = ({ readed, title, text }) => {
  let icon;

  switch (title) {
    case "Te han dado like!":
      icon = <ThumbUpIcon className="text-blue-500 mr-2" />;
      break;
    case "Nuevo comentario!":
      icon = <ReplyIcon className="text-blue-500 mr-2" />;
      break;
    case "Mention":
      icon = <MentionIcon className="text-blue-500 mr-2" />;
      break;
    case "Nuevo seguidor!":
      icon = <PersonIcon className="text-blue-500 mr-2" />;
      break;
    case "Bienvenido a la app":
      icon = <CelebrationIcon className="text-blue-500 mr-2" />;
      break;
    default:
      icon = <div></div>;
  }

  return (
    <div
      className={`flex items-center p-4 border-b border-gray-200 ${
        readed ? "bg-gray-50" : "hover:bg-gray-100 transition duration-300"
      }`}
    >
      {icon}
      <div className="flex flex-col">
        <span className="text-gray-700">{title}</span>
        <span className="text-gray-500 text-sm">{text}</span>
      </div>
    </div>
  );
};

export default TwitterNotification;

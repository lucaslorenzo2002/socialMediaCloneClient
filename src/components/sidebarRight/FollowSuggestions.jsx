import React, { useEffect, useState } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios, { all } from "axios";
import CONFIG from "../../constants/config";

const FollowSuggestions = () => {
  const [allUsers, setAllUsers] = useState([]); // Obtiene la lista de usuarios del estado global

  useEffect(() => {
    axios
      .get(`${CONFIG.BASE_URL}/usuarios`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setAllUsers(response.data);
      });
  }, []);

  // Función para obtener una muestra aleatoria de usuarios
  const getRandomUsers = (users, count) => {
    const shuffled = [...users].sort(() => 0.5 - Math.random()); // Crea una copia del array antes de ordenarlo
    return shuffled.slice(0, count);
  };
  const userCount = allUsers.length < 3 ? allUsers.length : 3;

  const users = [] || getRandomUsers(allUsers, userCount); // Obtiene 3 usuarios aleatorios TODO

  return (
    <div>
      {users.map((user, index) => (
        <Link
          to={`/profile/${user.id}`}
          key={index}
          className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg mb-2"
        >
          <PersonOutlineIcon />
          <div>
            <div className="font-bold">{user.display}</div>
            <div className="text-gray-500">{user.username}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FollowSuggestions;

import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FollowSuggestions = () => {
  const allUsers = useSelector((state) => state.users); // Obtiene la lista de usuarios del estado global

  // Función para obtener una muestra aleatoria de usuarios
  const getRandomUsers = (users, count) => {
    const shuffled = [...users].sort(() => 0.5 - Math.random()); // Crea una copia del array antes de ordenarlo
    return shuffled.slice(0, count);
  };

  const users = getRandomUsers(allUsers, 3); // Obtiene 3 usuarios aleatorios

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

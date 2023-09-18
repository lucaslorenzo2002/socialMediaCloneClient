import { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import FollowBtn from "../../components/followBtn/FollowBtn";
import { Link } from "react-router-dom";

const Explore = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([
    // Ejemplo de usuarios con fotos de perfil
    {
      id: 1,
      name: "John Doe",
      handle: "@johndoe",
    },
    {
      id: 2,
      name: "Jane Smith",
      handle: "@janesmith",
    },
  ]);

  const handleSearch = () => {
    const filteredUsers = users.filter((user) =>
      user.handle.includes(username)
    );
    setUsers(filteredUsers);
  };

  return (
    <div className="mt-5 px-8 md:pl-10 lg:p-0">
      <h2 className="text-2xl font-bold mb-5 text-center">Buscar Usuarios</h2>
      <div className="flex items-center">
        <div className="relative w-full flex-1">
          <SearchIcon className="absolute left-3 top-2 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar Usuarios"
            className="border rounded-full w-full px-2 pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      <ul className="mt-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between p-4 border-b hover:bg-gray-50 transition-colors duration-200"
          >
            <Link to={`/profile/${user.id}`} className="flex items-center">
              <img
                src={user.image || "/defaultProfileImg.png"}
                alt={user.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <div className="flex items-center flex-1">
                  <span className="font-bold text-sm mr-1">{user.name}</span>
                </div>
                <span className="text-gray-500 text-sm">{user.handle}</span>
              </div>
            </Link>
            <FollowBtn
              profileData={user}
              isFollowing={user?.isFollowing}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Explore;

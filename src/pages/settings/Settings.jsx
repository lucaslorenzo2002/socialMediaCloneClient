import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import CONFIG from "../../constants/config";

const EditProfile = () => {
  const [profileData, setProfileData] = useState({});
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    // Carga inicial del perfil
    axios
      .get(`${CONFIG.BASE_URL}/perfilusuario/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProfileData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, [user, token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevData) => ({ ...prevData, [name]: "@" + value }));
  };

  const handleSubmit = () => {
    // Lógica para actualizar el perfil
    console.log("Profile updated:", profileData);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white min-h-screen">
      <div className="mb-8">
        <img
          src={profileData?.profile_photo || "/defaultProfileImg.png"}
          alt={`${profileData?.full_name}'s profile`}
          className="rounded-full w-32 h-32 border-4 border-gray-300 mb-4"
        />
        <label className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
          Change Photo
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              // Manejar la subida de imágenes aquí
              console.log("Image uploaded:", e.target.files[0]);
            }}
          />
        </label>
      </div>
      <input
        type="text"
        name="full_name"
        value={profileData.full_name || ""}
        onChange={handleInputChange}
        placeholder="Full Name"
        className="border border-gray-300 p-2 mb-4 w-full rounded"
      />
      <div className="flex items-center border border-gray-300 p-2 mb-4 w-full rounded">
        <span className="text-gray-600">@</span>
        <input
          type="text"
          name="username"
          value={profileData.username?.replace(/^@/, "") || ""}  // Quitamos el '@' del inicio si es que lo tiene
          onChange={handleInputChange}
          placeholder="Username"
          className="ml-2 flex-1 focus:outline-none"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded w-full"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditProfile;

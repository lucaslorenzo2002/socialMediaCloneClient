import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import CONFIG from "../../constants/config";
import toast from "react-hot-toast";

const EditProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [profilePhoto, setProfilePhoto] = useState(null);

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
    const formData = new FormData();

    formData.append("username", profileData.username);
    formData.append("fullName", profileData.full_name);
    formData.append("bio", profileData.bio);

    if (profilePhoto) {
      formData.append("files", profilePhoto);
    }

    axios
      .post(`${CONFIG.BASE_URL}/actualizarperfil`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Perfil actualizado con éxito:", response.data);
        toast.success("Profile updated successfully");
      })
      .catch((error) => {
        toast.error("Error updating profile");
        console.error("Error actualizando perfil:", error);
      });
  };

  const handleNameChange = (event) => {
    const { value } = event.target;
    setProfileData((prevData) => ({ ...prevData, full_name: value }));
  };

  const handleBioChange = (event) => {
    const { value } = event.target;
    setProfileData((prevData) => ({ ...prevData, bio: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log("File:", file);

    if (file) {
      const reader = new FileReader();

      reader.onload = function (event) {
        // El resultado contiene la imagen en formato base64
        setProfilePhoto(event.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleBirthdayChange = (event) => {
    const { value } = event.target;
    setProfileData((prevData) => ({ ...prevData, birthday: value }));
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white min-h-screen">
      <div className="mb-8">
        <img
          src={
            profileData?.profile_photo ||
            profilePhoto ||
            "/defaultProfileImg.png"
          }
          alt={`${profileData?.full_name}'s profile`}
          className="rounded-full object-cover w-32 h-32 border-4 border-gray-300 mb-4"
        />
        <label className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
          Change Photo
          <input type="file" className="hidden" onChange={handleImageUpload} />
        </label>
      </div>
      <input
        type="text"
        name="full_name"
        value={profileData.full_name || ""}
        onChange={handleNameChange}
        placeholder="Full Name"
        className="border border-gray-300 p-2 mb-4 w-full rounded"
      />
      <div className="flex items-center border border-gray-300 p-2 mb-4 w-full rounded">
        <span className="text-gray-600">@</span>
        <input
          type="text"
          name="username"
          value={profileData.username?.replace(/^@/, "") || ""} // Quitamos el '@' del inicio si es que lo tiene
          onChange={handleInputChange}
          placeholder="Username"
          className="ml-2 flex-1 focus:outline-none"
        />
      </div>

      <input
        type="date"
        name="birthday"
        value={profileData.birthday || ""}
        onChange={handleBirthdayChange}
        placeholder="Birthday"
        className="border border-gray-300 p-2 mb-4 w-full rounded"
      />

      <div className="flex items-center border border-gray-300 p-2 mb-4 w-full rounded">
        <textarea
          value={profileData.bio || ""}
          type="text"
          name="bio"
          onChange={handleBioChange}
          placeholder="Bio"
          className="ml-2 flex-1 focus:outline-none h-10 resize-none"
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

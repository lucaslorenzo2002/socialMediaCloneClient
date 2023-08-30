import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const baseUrl =
  "https://social-media-clone-e37q-ltz9wtdic-lucaslorenzo2002.vercel.app/api";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post(`${baseUrl}/register`, formData);
      console.log(response.data);
    } catch (error) {
      console.error("Hubo un error al registrar:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <div className="w-full">
          <img
            src="/twitter-logo.png"
            alt="Twitter Logo"
            width={"40px"}
            className="mx-auto mb-2"
          />
        </div>
        <h1 className="text-2xl font-bold mb-4">Create an account</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="fullName"
            >
              Nombre
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              onChange={handleChange}
              value={formData.name}
              className="p-2 w-full border rounded focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              className="p-2 w-full border rounded focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="username"
            >
              Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              value={formData.username}
              className="p-2 w-full border rounded focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="p-2 w-full border rounded focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Registrarse
          </button>
          <p className="mt-5">
            Already have an account?{" "}
            <Link className="text-blue-500" to={"/login"}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

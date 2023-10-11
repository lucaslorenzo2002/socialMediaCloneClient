import React from "react";
import { Link } from "react-router-dom";

const EmailConfirm = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <img
          src="/twitter-logo.png"
          alt="Twitter Logo"
          width={"40px"}
          className="mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold mb-4">Validación de mail</h1>
        <p className="mb-6">
          Te llegará un mail a tu correo. Haz click en el link para validar tu
          cuenta y luego inicia sesión.
        </p>
        <div className="flex flex-col gap-5">
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Ir al Login
          </Link>
          <Link
            to="/signup"
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition-colors"
          >
            Volver al Registro
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirm;

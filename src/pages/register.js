import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Realiza la solicitud POST a la API
      const response = await api.post("/user", {
        name,
        email,
        password,
      });

      console.log(response.data); // Respuesta de la API

      // Restablece los campos del formulario
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen md:h-screen lg:py-0">
        <a
          href=""
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <svg
            className="h-24 w-64 text-[#FFB22C]"
            fill="currentColor"
            viewBox="0 0 24 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              strokeWidth={2}
              d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z"
            ></path>
          </svg>
        </a>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Registra tu cuenta
            </h1>
            <Typography color="gray" className="mt-1 font-normal">
              Ingresa tus datos para registrarte.
            </Typography>
            <form
              className="mt-8 mb-2 w-full max-w-screen-lg sm:w-96" onSubmit={handleRegister}
              >
              <div className="block mb-4 flex flex-col gap-6">
                <Input
                  type="text"
                  size="lg"
                  label="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  type="email"
                  size="lg"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  size="lg"
                  label="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Checkbox onClick={() => setIsChecked(!isChecked)}
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal"
                  >
                    Estoy de acuerdo
                    <a
                      href="#"
                      className="font-medium transition-colors hover:text-blue-500"
                    >
                      &nbsp;con usar el sistema
                    </a>
                  </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
                checked={isChecked}
                required
              />
              <Button type="submit" className="mt-6 w-full" fullWidth disabled={!name || !email || !password || !isChecked}> 
                Registrarme
              </Button>
              <Typography color="gray" className="mt-4 text-center font-normal">
                Ya tienes una cuenta?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                >
                  Iniciar Sesión
                </Link>
              </Typography>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;

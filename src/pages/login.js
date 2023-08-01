import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate  } from "react-router-dom";
import api from "../api/api";
import React, { useEffect, useRef, useState } from "react";

function Login() {
  const userRef =  useRef(); 
  const urrRef =  useRef(); 

  const [name,setName] = useState('')
  const [password, setPassword] = useState('')
  const [errMensaje,setErrMensaje] = useState('')
  const [success,setSuccess] = useState(false)
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    userRef.current.focus();
  }, [])

  useEffect(()=>{
    setErrMensaje('');
  }, [])

  // useEffect(() => {
  //   const token = localStorage.getItem('token');

  //   // Verificar si el token existe
  //   if (!token) {
  //     // Redirigir a la ruta "/login"
  //     navigate  ('/login');
  //   }
  // }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {

      // Realiza la petición POST a tu backend con los datos del formulario
      const response = await api.post('/login', {
        email: name,
        password: password,
        
      });
  
      console.log(response.data); // Puedes hacer algo con la respuesta del backend si lo necesitas
      console.log("estas adentro chaval")

      const token = response.data.token;
      if (token) {
        // Verificar si el token es válido según tus criterios
        // Redirigir al usuario a la ruta "/"
        localStorage.setItem('token', token);
        navigate('/');
      } else {
        
      }

      setName('');
      setPassword('');
      setSuccess(true);
      
    } catch (error) {
      console.log(error);
      setErrMensaje('Ocurrió un error al enviar los datos al backend.');
    }
  };

 


  
  return (

<>

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
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        ></path>
      </svg>
    </a>

    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Inicia sesión
        </h1>
        <Typography color="gray" className="mt-1 font-normal">
          Ingresa tus datos para iniciar sesión.
        </Typography>

        <div className="space-y-4 md:space-y-6" action="#">
          <div>
            <form className="mt-8 mb-2 sm:w-full" onSubmit={handleSubmit}>
              
              <div className="block mb-4 flex flex-col gap-6">

                <Input size="lg" type="text" id="name" ref={userRef}
                 onChange={(e) => setName(e.target.value)} value={name} label="Email" required/>

                <Input type="password" id="password" size="lg" label="Contraseña" 
                 onChange={(e) => setPassword(e.target.value)} value={password} required/>
              
              </div>
              <div className="flex items-center flex-wrap">
              <Checkbox onClick={() => setIsChecked(!isChecked)}
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal"
                  >
                    Estoy de acuerdo
                  </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
                checked={isChecked}
                required
              />

              <Typography color="gray" className=" ml-0 sm:ml-2 mt-2 sm:mt-0 font-normal">
                <a
                  href="#"
                  className=" ml-14 font-medium text-primary-600 transition-colors hover:text-blue-700"
                >
                  No tienes cuenta aún?
                </a>
              </Typography>
            </div>
            <Button className="mt-6 w-full" type="submit" disabled={!name || !password || !isChecked}>
            Aceptar
            </Button>
            </form>
          </div>
          <Typography color="gray" className="mt-4 font-normal">
            No tienes cuenta aún?{" "}
            <Link to="/register" className="font-medium text-blue-500 transition-colors hover:text-blue-700">Registrate</Link>
          </Typography>
        </div>
      </div>
    </div>
  </div>
</section>
</>
  );
}

export default Login;

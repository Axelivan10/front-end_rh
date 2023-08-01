import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Select,
  Option,
} from "@material-tailwind/react";

function Form_crear() {
  const [name,setName] = useState('')
  const [email, setEmail] = useState('')
  const [img,setImg] = useState('')
  const [puesto, setPuesto] = useState('')
  const [numberMsp,setNumberMsp] = useState('')
  const [rfc, setRfc] = useState('')
  const [curp,setCurp] = useState('')
  const [place,setPlace] = useState('')
  const [salary, setSalary] = useState('')
  const [hired, setHired] = useState('')
  const [birth, setBirth] = useState('')
  const [lastname, setLastname] = useState('')
  const [tel, setTel] = useState('')
  
  const userRef =  useRef(); 
  const urrRef =  useRef(); 
  
  const [errMensaje,setErrMensaje] = useState('')
  const [success,setSuccess] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Verificar si el token existe
    if (!token) {
      // Redirigir a la ruta "/login"
      navigate("/login");
    }
  }, []);

  useEffect(()=>{
    userRef.current.focus();
  }, [])

  useEffect(()=>{
    setErrMensaje('');
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {

      // Realiza la petición POST a tu backend con los datos del formulario
      const response = await api.post('/colaborador', {
        name: name,
        email: email,
        img: img,
        puesto: puesto,
        numberMsp: numberMsp,
        rfc: rfc,
        curp: curp,
        place: place,
        salary: salary,
        hired: hired,
        birth: birth,
        lastname: lastname,
        tel: tel,
      },
      navigate('/list')
      );
  
      console.log(response.data); // Puedes hacer algo con la respuesta del backend si lo necesitas
      console.log("estas adentro chaval")

      setName('');
      setEmail('');
      setImg('');
      setPuesto('');
      setNumberMsp('');
      setRfc('');
      setCurp('');
      setPlace('');
      setSalary('');
      setHired('');
      setBirth('');
      setLastname('');
      setTel('');
    
      setSuccess(true);
      
    } catch (error) {
      console.log(error);
      setErrMensaje('Ocurrió un error al enviar los datos al backend.');
    }
  };


  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <div className="ml-6">
            <h2 className="font-semibold text-xl text-primary-100 transition-colors hover:text-yellow-800 ">
              Crea un nuevo usuario
            </h2>
            <p className="text-gray-800 mb-6">
              Asegurate de agregar correctamente los datos.
            </p>
          </div>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 border border-yellow-800">
            <div className="text-gray-800 mb-8">
              <p className=" font-semibold font-large text-lg text-grey-700 transition-colors hover:text-yellow-800">
                Datos personales nuevo embajador
              </p>
            </div>

            <div className="lg:col-span-2 ">
              <form className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row md:col-span-5 mb-4">
                  <div className="w-full md:w-1/2 pr-2">
                    <div className="flex flex-col items-end gap-6">
                      <Input size="lg" label="Nombre(s)" ref={userRef}
                 onChange={(e) => setName(e.target.value)} value={name} required/>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 pr-2">
                    <div className="flex flex-col items-end gap-6">
                      <Input size="lg" label="Apellido(s)" ref={userRef}
                 onChange={(e) => setLastname(e.target.value)} value={lastname} required/>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:col-span-5 mb-4">
                  <div className="w-full md:w-1/2 pr-2">
                    <Input type="email" label="Email" ref={userRef}
                 onChange={(e) => setEmail(e.target.value)} value={email} required/>
                  </div>
                  <div className="w-full md:w-1/2 pr-2">
                    <div className="flex flex-col items-end gap-6">
                      <Input size="tel" label="Numero Telefonico" ref={userRef}
                 onChange={(e) => setTel(e.target.value)} value={tel} required/>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:col-span-5 mt-4">
                  <div className="w-full md:w-1/3 pr-2">
                    <Input label="Puesto" ref={userRef}
                 onChange={(e) => setPuesto(e.target.value)} value={puesto} required/>
                  </div>
                  <div className="w-full md:w-1/3 pr-2">
                    <Input label="Numero de colaborador" ref={userRef}
                 onChange={(e) => setNumberMsp(e.target.value)} value={numberMsp} required/>
                  </div>
                  <div className="w-full md:w-1/3 pr-2">
                    <div className="flex flex-col items-end gap-6">
                      <Input label="Lugar de trabajo" ref={userRef}
                 onChange={(e) => setPlace(e.target.value)} value={place} required/>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:col-span-5 mt-4">
                  <div className="w-full md:w-1/3 pr-2">
                    <Input label="RFC" ref={userRef}
                 onChange={(e) => setRfc(e.target.value)} value={rfc} required/>
                  </div>
                  <div className="w-full md:w-1/3 pr-2">
                    <Input label="CURP" ref={userRef}
                 onChange={(e) => setCurp(e.target.value)} value={curp} required/>
                  </div>
                  <div className="w-full md:w-1/3 pr-2">
                    <div className="flex flex-col items-end gap-6">
                      <Input label="Salario" ref={userRef}
                 onChange={(e) => setSalary(e.target.value)} value={salary} required/>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:col-span-5 mt-6">
                  <div className="w-full md:w-1/2 pr-2">
                    <Input label="Fecha contratación (AA/MM/DD)" ref={userRef}
                 onChange={(e) => setHired(e.target.value)} value={hired} required/>
                  </div>
                  <div className="w-full md:w-1/2 pr-2">
                    <Input label="Fecha de nacimiento (AA/MM/DD)" ref={userRef}
                 onChange={(e) => setBirth(e.target.value)} value={birth} required/>
                  </div>
                </div>

                {/* <div className="flex flex-col md:flex-row md:col-span-5 mt-6">
                  <div className="w-full md:w-1/2 pr-2">
                    <Input
                      className="border border-gray-100 py-2"
                      accept="image/*"
                      id="imageUpload"
                      type="file"
                      htmlFor="imageUpload"
                      label="Subir imagen"
                    />
                  </div>
                </div> */}

                <div className="md:col-span-5 text-right mt-6">
                  <div className="inline-flex items-end mr-2">
                    <button className="bg-[#09a9b8] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Guardar
                    </button>
                  </div>
                  <div className="inline-flex items-end ml-2">
                    <Link to="/list" className="flex items-center">
                      <button className="bg-[#FFB22C] hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded">
                        Cancelar
                      </button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form_crear;

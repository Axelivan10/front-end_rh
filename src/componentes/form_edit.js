import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import axios from "axios";

import {
  Avatar,
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

function Form_edit() {
  const [data, setData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);

 
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Verificar si el token existe
    if (!token) {
      // Redirigir a la ruta "/login"
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/colaborador/${id}`); // Reemplaza "/ruta" con la ruta correcta para obtener los datos por ID desde la API
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.put(`/colaborador/${id}`, data); // Reemplaza "/ruta" con la ruta correcta para actualizar los datos por ID en la API
      navigate("/list");
    } catch (error) {
      console.error(error);
    }
  };


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmitdoc = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Por favor, seleccione una imagen.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("avatar", selectedFile);

      await api.post(`/colaborador/${data.id}/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("La imagen ha sido subida correctamente.");
      
      setSelectedFile(null); // Limpiar el estado del archivo seleccionado
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      alert("Hubo un error al subir la imagen.");
    }
    handleReloadPage();
  };

  const handleReloadPage = () => {
    window.location.href = window.location.href;
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto ">
        <div>
          <div className="flex items-start">
            <div className="w-1/3 w-20 mb-2 ml-4">
              <Avatar
                src={
                  data.img
                    ? data.img
                    : "https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png"
                }
                alt="avatar"
                className="h-20 w-60 border-2 border-yellow-800"
              />
            </div>
            <div className="w-2/3 ml-4 mt-4">
              <h2 className="font-semibold text-xl text-primary-100 transition-colors hover:text-yellow-800 ">
                Edita a nuestro embajador
              </h2>
              <p className="text-gray-800 mb-6">
                {data.name} {data.lastname}
              </p>
            </div>
          </div>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 border border-yellow-800">
            <div className="text-gray-800 mb-8">
              <p className=" font-semibold font-large text-lg text-grey-700 transition-colors hover:text-yellow-800">
                Datos Personales Embajador
              </p>
            </div>

            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="flex flex-col md:flex-row md:col-span-5 mb-4">
                    <div className="w-full md:w-1/2 pr-2 mb-2">
                      <div className="flex flex-col items-end gap-6">
                        <Input
                          size="lg"
                          label="Nombre(s)"
                          name="name"
                          value={data.name || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 pr-2">
                      <div className="flex flex-col items-end gap-6">
                        <Input
                          size="lg"
                          label="Apellido(s)"
                          name="lastname"
                          value={data.lastname || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:col-span-5 mb-4">
                    <div className="w-full pr-2">
                      <Input
                        type="email"
                        label="Email"
                        name="email"
                        value={data.email || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    {/* <div className="w-full md:w-1/2 pr-2">
                      <Input
                        type="text"
                        label="Telefono"
                        name="tel"
                        value={data.tel || ""}
                        onChange={handleInputChange}
                      />
                    </div> */}
                  </div>

                  <div className="flex flex-col md:flex-row md:col-span-5 mt-2">
                    <div className="w-full md:w-1/3 pr-2 mb-2">
                      <Input
                        label="Puesto"
                        name="puesto"
                        value={data.puesto || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/3 pr-2 mb-2">
                      <Input
                        label="Numero de colaborador"
                        name="numberMsp"
                        value={data.numberMsp || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/3 pr-2 mb-2">
                      <div className="flex flex-col items-end gap-6">
                        <Input
                          label="Lugar de trabajo"
                          name="place"
                          value={data.place || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:col-span-5 mt-4">
                    <div className="w-full md:w-1/2 pr-2 mb-2">
                      <Input
                        label="RFC"
                        name="rfc"
                        value={data.rfc || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/2 pr-2 mb-2">
                      <Input
                        label="CURP"
                        name="curp"
                        value={data.curp || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/2 pr-2 md:pl-2 mb-2">
                      <div className="flex flex-col items-end gap-6">
                        <Input
                          label="Salario"
                          name="salary"
                          value={data.salary || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:col-span-5 mt-6">
                    <div className="w-full md:w-1/2 pr-2 mb-2">
                      <Input
                        label="Fecha contratación (AA/MM/DD)"
                        name="hired"
                        value={data.hired || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/2 pr-2 mb-2">
                      <Input
                        label="Fecha de nacimiento (AA/MM/DD)"
                        name="birth"
                        value={data.birth || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  {/* <div className="flex flex-col md:flex-row md:col-span-5 mt-4">
                     <div className="w-full md:w-1/2 pr-2 mb-2">
                      <div className="flex flex-col items-end gap-6">
                        <Input
                          size="lg"
                          label="Nacionalidad"
                          name="country"
                          value={data.country || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div> 
                    <div className="w-full  pr-2">
                      <div className="flex flex-col items-end gap-6">
                        <Input
                          size="lg"
                          label="dirección"
                          name="direction"
                          value={data.direction || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div> */}

                  <div className="md:col-span-5 text-right mt-6">
                    <div className="inline-flex items-end mr-2">
                      <button
                        type="submit"
                        className="bg-[#09a9b8] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
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
                </div>
              </form>
              <div className="flex flex-col md:flex-row md:col-span-5 mt-2">
                <div className="w-full md:w-1/2 pr-2">
                  <form onSubmit={handleSubmitdoc}>
                    <label htmlFor="imageUpload">
                      <input
                        className="border border-gray-100 py-2"
                        accept="image/*"
                        id="imageUpload"
                        type="file"
                        onChange={handleFileChange}
                      />
                    </label>
                    <button className="ml-6" type="submit"> Establecer</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form_edit;

import logo from "../img/Logo_morpho.JPG";
import {
  MagnifyingGlassIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { TrashIcon, PencilSquareIcon, DocumentDuplicateIcon   } from "@heroicons/react/24/solid";

import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Link, useParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa"; //ESTA LINEA ES DEL MODAL VER COMO PASARLO A UN COMPONENTE
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../api/api";

import {
  Card,
  CardHeader,
  Navbar,
  MobileNav,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

// "Nombre", "Email", "Imagen", "Puesto", "Number Embajador", "RFC", "CURP", "Lugar de trabajo", "Salario", "Contratado", "Expiración",""
const TABLE_HEAD = [
  "Colaborador",
  "Puesto",
  "RFC",
  "CURP",
  "L. trabajo",
  "Salario",
  "Contratado",
  "Fecha de nacimiento",
  "",
  "",
  "",
];

function Listado() {

  const [showModal, setShowModal] = React.useState(false);
  const [openNav, setOpenNav] = React.useState(false);
  const [data, setData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(data.length / usersPerPage);

  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("token");

    // Verificar si el token existe
    if (!token) {
      // Redirigir a la ruta "/login"
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem("token");

    // Redirigir al usuario a la ruta "/login"
    navigate("/login");
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/" className="flex items-center">
          Inicio
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/list" className="flex items-center">
          Listado Embajador
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/create" className="flex items-center">
          Crear Embajador
        </Link>
      </Typography>

      {/* <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
        </a>
      </Typography> */}
    </ul>
  );

  const deleteById = async (id) => {
    try {
      await api.delete(`/colaborador/${id}`);
      // Realizar cualquier acción adicional después de eliminar el elemento
      fetchData();
    } catch (error) {
      console.error("Error al eliminar el elemento:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await api.get("/colaborador");
      console.log(response.data.date);

      const filteredData = response.data.data.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div>
      <>
        <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
          <div className=" flex items-center justify-between text-blue-gray-900">
            <Typography
              as="a"
              href="/"
              className=" h-18 w-64 inline-block bg-teal-400 "
            >
              <img src={logo} alt="Morpho" />
            </Typography>

            <div className="flex items-center gap-4">
              <div className="mr-4 hidden lg:block">{navList}</div>

              <Button
                size="sm"
                className="bg-[#09a9b8] hidden lg:inline-block"
                onClick={handleLogout}
              >
                <span>Cerrar Sesión</span>
              </Button>

              <IconButton
                variant="text"
                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </IconButton>
            </div>
          </div>

          <MobileNav open={openNav}>
            {navList}
            <Button variant="gradient" size="sm" fullWidth className="mb-2">
              <span>Cerrar Sesión</span>
            </Button>
          </MobileNav>
        </Navbar>

        <div className="flex items-center justify-center mx-auto p-12 space-y-20">
          <Card className="h-full w-full ">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-2/3 text-center md:text-left md:ml-4 md:mb-0">
                  <Typography variant="h5" color="blue-gray">
                    Lista de Colaboradores MTE
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    Morpho Travel Experience
                  </Typography>
                </div>

                {/* <div className="w-full md:w-72 mr-4 mt-2">
                  <Input
                    label="Search"
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div> */}

                <div className="mt-2 flex flex-col gap-2 sm:flex-row mr-4 ">
                  <Link to="/create" className="flex items-center">
                    <Button
                      className=" bg-[#09a9b8] flex items-center gap-3 "
                      color="blue"
                      size="sm"
                    >
                      <UserPlusIcon strokeWidth={2} className="h-6 w-6" />
                      Crear Embajador
                    </Button>
                  </Link>
                </div>
              </div>
            </CardHeader>

            <CardBody className="overflow-scroll px-0">
              <table className="mt-4 w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head, index) => (
                      <th
                        key={head}
                        className=" bg-[#FFB22C] cursor-pointer border-y p-4 transition-colors hover:bg-[#fcc46a]"
                      >
                        <Typography
                          variant="large"
                          color="white"
                          className="flex items-center justify-between gap-2 font-normal leading-none"
                        >
                          {head}{" "}
                          {/* {index !== TABLE_HEAD.length - 1 && (
                            <ArrowRightIcon
                              strokeWidth={2}
                              className="h-4 w-4"
                            />
                          )} */}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {(currentUsers).map((item) => (
                    <tr key={item.id} className="border-t border-gray-200 mb-2">
                      <td>
                        <div className="flex items-center gap-8 mb-1">
                        <Avatar className="m-2" size="s" src={item.img ? item.img : "https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png"} />

                          <div className="flex flex-col ml-2">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item.name} {item.lastname}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {item.email}
                            </Typography>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.puesto}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {item.numberMsp}
                          </Typography>
                        </div>
                      </td>
                      <td>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.rfc}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.curp}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.place}
                        </Typography>
                      </td>

                      <td>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.salary}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.hired}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.birth}
                        </Typography>
                      </td>

                      <td>
                        <Tooltip content="PDF embajador">
                          <Link to={`/contrato/${item.id}`}>
                            <IconButton variant="text">
                              <DocumentDuplicateIcon className="h-6 w-6 text-morphoYellow" />
                            </IconButton>
                          </Link>
                        </Tooltip>
                      </td>

                      <td>
                        <Tooltip content="Editar embajador">
                          <Link to={`/edit/${item.id}`}>
                            <IconButton variant="text" color="blue">
                              <PencilSquareIcon className="h-6 w-6 text-morphoBlue" />
                            </IconButton>
                          </Link>
                        </Tooltip>
                      </td>

                      <td>
                        <Tooltip content="Eliminar embajador">
                          <IconButton
                            onClick={() => {
                              setSelectedItemId(item.id);
                              setShowModal(true);
                            }}
                            variant="text"
                            color="red"
                          >
                            <TrashIcon className="h-6 w-6 text-red-500" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>            
                  ))}
                  
                </tbody>
                
              </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                Pagina {currentPage} of {totalPages}
              </Typography>
              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  color="blue-gray"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Anterior
                </Button>
                <Button
                  variant="outlined"
                  color="blue-gray"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Siguiente
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* ESTA LINEA ES DEL MODAL VER COMO PASARLO A UN COMPONENTE */}
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-2xl">
                {/*content*/}

                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
                  {/*header*/}

                  <div className="flex items-start justify-start p-5 border-b border-solid border-slate-200 rounded-t ">
                    <svg
                      className="w-32 h-14 text-[#FFB22C]"
                      fill="currentColor"
                      viewBox="0 0 24 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        strokeWidth={2}
                        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      ></path>
                    </svg>
                    <h3 className="text-2xl font-semibold ml-4">
                      ¿Estás seguro que desea guardar los cambios?
                    </h3>
                    <Button
                      className="bg-transparent hover:bg-[#09a9b8] items-end justify-end"
                      onClick={() => setShowModal(false)}
                      variant="text"
                    >
                      <FaTimes className="text-black" />
                    </Button>
                  </div>

                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed text-justify">
                      Si aceptas los cambios estos se harán de manera
                      permanente. Por esta razón asegurate que todo se correcto.
                    </p>
                  </div>
                  {/*footer*/}

                  <div className="md:col-span-5 text-right mb-6 mr-6">
                    <div className="inline-flex items-end mr-2">
                      <button
                        onClick={() => {
                          console.log(selectedItemId);
                          deleteById(selectedItemId);
                          setShowModal(false);
                        }}
                        className="bg-[#09a9b8] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Guardar
                      </button>
                    </div>
                    <div className="inline-flex items-end ml-2">
                      <button
                        onClick={() => setShowModal(false)}
                        className="bg-[#FFB22C] hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    </div>
  );
}

export default Listado;

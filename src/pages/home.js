import logo from "../img/Logo_morpho.JPG";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../api/api";

import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
  CardHeader,
  Input,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";

const TABLE_HEAD = ["Colaborador", "Puesto", "Contratado", "Fecha de nacimiento", ""];

function Home() {
  const [data, setData] = useState([]);
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(data.length / usersPerPage);

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
        <Link to="list/" className="flex items-center">
          Listado Embajador
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/colaborador");
        console.log(response.data.date);
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

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

        <div className="flex items-center justify-center mx-auto p-12 space-y-20 ">
          <Card className="h-full w-full">
            <CardHeader
              floated={false}
              shadow={false}
              className="rounded-none "
            >
              <div className="ml-4 flex flex-col md:flex-row items-center md:items-start justify-between md:gap-8">
                <div className="md:w-2/3">
                  <Typography variant="h5" color="blue-gray">
                    LISTA CONTRATO DE COLABORADORES
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    Mira los próximos colaboradores a expirar su contrato
                  </Typography>
                </div>

                {/* <div className="w-full md:w-72 mt-4 md:mt-0">
                  <Input
                    label="Search"
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  />
                </div> */}
              </div>
            </CardHeader>

            <CardBody className="overflow-scroll px-0">
              <table className="mt-2 w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th key={head} className="bg-[#FFB22C] border-y p-4">
                        <Typography
                          variant="large"
                          color="white"
                          className="font-normal leading-none"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {currentUsers.map((item) => (
                    <tr key={item.id} className="border-t border-gray-200 mb-2">
                      <td >
                        <div className="flex items-center gap-8 ml-4">
                          <Avatar className="m-2" size="s" src={item.img} />
                          <div className="flex flex-col ml-2">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item.name}
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
      </>
    </div>
  );
}

export default Home;

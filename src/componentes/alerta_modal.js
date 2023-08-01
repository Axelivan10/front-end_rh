import React from "react";
import { Button } from "@material-tailwind/react";
import { FaTimes } from "react-icons/fa";

function Alerta_modal() {
  const [showModal, setShowModal] = React.useState(false);
  
  
  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Guardar
      </button>

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
                    Si aceptas los cambios estos se harán de manera permanente.
                    Por esta razón asegurate que todo se correcto.
                  </p>
                </div>
                {/*footer*/}

                <div className="md:col-span-5 text-right mb-6 mr-6">
                  <div className="inline-flex items-end mr-2">
                    <button onClick={() => setShowModal(false)} className="bg-[#09a9b8] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Guardar
                    </button>
                  </div>
                  <div className="inline-flex items-end ml-2">
                    <button onClick={() => setShowModal(false)} className="bg-[#FFB22C] hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded">
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
  );
}

export default Alerta_modal;

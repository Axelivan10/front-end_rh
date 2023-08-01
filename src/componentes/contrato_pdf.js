import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { A4Page, Preview } from "react-html2pdf";
import html2pdf from "html2pdf.js";
import { Page, Document, Text, View, StyleSheet } from "@react-pdf/renderer";
import img from "../img/imagen.JPG";

import { Avatar } from "@material-tailwind/react";

function Contrato_pdf() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();

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

  // const generatePdf = () => {
  //   const element = document.getElementById("contract");
  //   const opt = {
  //     margin: 10,
  //     filename: "contract.pdf",
  //     image: { type: "jpeg", quality: 0.98 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  //   };
  //   html2pdf().from(element).set(opt).save();
  // };

  //SACAR FECHA CON FORMATO-------------------------------------------
  const fechaHired = new Date(data.hired);
  // Obtenemos el día, mes y año
  const dia = fechaHired.getDate();
  const mes = fechaHired.toLocaleString("default", { month: "long" });
  const anio = fechaHired.getFullYear();
  const fechaFormateada = `${dia} de ${mes} del ${anio}`;

  const fechaBirth = new Date(data.birth);
  const dia1 = fechaBirth.getDate();
  const mes1 = fechaBirth.toLocaleString("default", { month: "long" });
  const anio1 = fechaBirth.getFullYear();
  const fechaFormateada1 = `${dia1} de ${mes1} del ${anio1}`;

  //SACAR EDAD-------------------------------------------

  const nacimiento = new Date(data.birth);
  const fechaActual = new Date();

  const año1 = nacimiento.getFullYear();
  const año2 = fechaActual.getFullYear();

  let edad = año2 - año1;

  return (
    <div>
      {/* <div className="flex items-start">
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
      <button onClick={generatePdf}>Generar PDF</button> */}

      <div
        id="contract"
        class="flex justify-center h-screen bg-top bg-cover" /*style={{ backgroundImage: `url(${img})` }}*/
      >
        <A4Page>
          <div className="max-w-6xl mx-auto bg-white p-6 mr-12 mb-2 ml-12 text-justify font-times-new-roman">
            <img className="ml-4" src={img} alt="Morpho" />
            <p className="mb-4 font-bold text-sm">
              CONTRATO INDIVIDUAL DE TRABAJO POR TIEMPO INDETERMINADO CON
              PERIODO A PRUEBA QUE CELEBRAN POR UNA PARTE SERVICIOS COMERCIALES
              DEL SUR, S.A. DE C.V. A QUIEN EN LO SUCESIVO Y PARA LOS EFECTOS
              DEL PRESENTE CONTRATO SE LE DENOMINARÁ EL "
              <span style={{ textDecoration: "underline" }}>PATRÓN</span>" ,
              REPRESENTADA POR SU REPRESENTANTE LEGAL, EL SR. ROLANDO ZÚÑIGA
              RODRÍGUEZ, Y POR LA OTRA PARTE EL/LA SR./SRA.{" "}
              <span style={{ backgroundColor: "yellow" }}>
                {data.name} {data.lastname}{" "}
              </span>{" "}
              AMBROSIO POR SU PROPIO DERECHO, A QUIEN EN LO SUCESIVO Y PARA LOS
              EFECTOS DEL PRESENTE CONTRATO SE LE DENOMINARÁ EL "
              <span style={{ textDecoration: "underline" }}>EMPLEADO</span>", DE
              CONFORMIDAD CON LAS SIGUIENTES DECLARACIONES Y CLÁUSULAS:
            </p>

            <h2 className="text-base text-center font-bold mt-4">
              DECLARACIONES
            </h2>
            <div className="mt-6">
              <p>I. El PATRÓN declara:</p>
              <div className="ml-8">
                <p className="mt-2">
                  a) Ser una sociedad debidamente constituida de conformidad con
                  las leyes de los Estados Unidos Mexicanos.
                </p>
                <p className="mt-2">
                  b) Tener su domicilio ubicado en MONTE CAMPECHE SN MZA 83 LT 1
                  BOD 60 LOCALIDAD CANCÚN C.P. 77536 MUNICIPIO MUNICIPIO BENITO
                  JUÁREZ, QUINTANA ROO, y numero de RFC{" "}
                  <b style={{ backgroundColor: "yellow" }}>{data.rfc}</b>.
                </p>
                <p className="mt-2">
                  c) Que, por diversas razones, el PATRÓN requiere contratar los
                  servicios del EMPLEADO para desempeñar labores bajo la
                  categoría de{" "}
                  <b style={{ backgroundColor: "yellow" }}>{data.puesto}</b>,
                  por tiempo indeterminado a partir del{" "}
                  <b style={{ backgroundColor: "yellow" }}>{fechaFormateada}</b>
                  .
                </p>
              </div>
            </div>
            <div className="mt-6">
              <p>II. El EMPLEADO declara, por su propio derecho:</p>
              <div className="ml-8">
                <p className="mt-2">
                  a) Haber nacido el{" "}
                  <b style={{ backgroundColor: "yellow" }}>
                    {fechaFormateada1}
                  </b>
                  ; ser de nacionalidad
                  <b style={{ backgroundColor: "yellow" }}> Mexicana</b>; estado
                  civil _________; tener {edad} años de edad, con domicilio{" "}
                  <b style={{ backgroundColor: "yellow" }}>{data.place}</b>,
                  dirección que proporciona al PATRÓN para todos los efectos a
                  que haya lugar, bajo el entendido de que mientras que el
                  EMPLEADO no le comunique al PATRÓN por escrito el cambio de
                  domicilio, las notificaciones serán válidas al practicarse en
                  el domicilio inserto en el presente inciso.
                </p>
                <p className="mt-2">
                  b) No padecer enfermedad o incapacidad física que le
                  imposibilite desempeñar el trabajo para el cual es contratado.
                </p>
                <p className="mt-2">
                  c) Contar con la capacidad, conocimientos y experiencia
                  necesarios para prestar al PATRÓN los servicios descritos en
                  el inciso c) de la declaración primera I) del PATRÓN y acorde
                  a las estipulaciones contenidas en este Contrato.
                </p>
                <p className="mt-2">
                  d) Tener como clave del Registro Federal de Contribuyentes{" "}
                  <b style={{ backgroundColor: "yellow" }}> {data.rfc}</b> y
                  Clave Única de Registro de Población{" "}
                  <b style={{ backgroundColor: "yellow" }}>{data.curp}</b>.
                </p>
                <p className="mt-2">
                  e) Haber recibido una completa explicación del trabajo que va
                  a desarrollar y que tiene los conocimientos y aptitudes
                  necesarios para el desarrollo del mismo, por lo que está
                  conforme en prestar sus servicios al PATRÓN, de conformidad
                  con lo establecido en el presente Contrato.
                </p>
                <p>
                  Ambas partes sujetan el presente Contrato a las siguientes:
                </p>
              </div>
            </div>

            <h2 className="text-base text-center font-bold mt-4">CLÁUSULAS</h2>

            <div className="mt-6">
              <p>
                <b>PRIMERA.- </b>Por virtud del presente Contrato, el PATRÓN
                contrata los servicios por tiempo indeterminado del EMPLEADO
                quien se obliga a desempeñar las labores y obligaciones
                inherentes a la categoría de{" "}
                <b style={{ backgroundColor: "yellow" }}>{data.puesto}</b> y que
                de manera enunciativa mas no limitativa consisten en:
              </p>
              <div className="ml-8">
                <p className="mt-2">
                  1. Funciones Principales: Cumplir con el protocolo de servicio
                  al cliente dispuesto por la compañía.
                </p>
                <p className="mt-2">
                  2. Cumplir con las normativas de la organización y socios
                  comerciales dentro de las diferentes localidades. 3. Enviar el
                  cierre diario de ventas (POS) y resguardar los depósitos del
                  día en la caja fuerte.
                </p>
                <p className="mt-2">
                  3. Enviar el cierre diario de ventas (POS) y resguardar los
                  depósitos del día en la caja fuerte.
                </p>
                <p className="mt-2">
                  4. Hacer un uso adecuado de todas las herramientas de trabajo.
                </p>
                <p className="mt-2">
                  5. Manejar el sistema de ventas y cierre diario de caja
                  cumpliendo con la estandarización del proceso.
                </p>
                <p className="mt-2">
                  6. Mantener limpia y ordenada el área de trabajo.
                </p>
                <p className="mt-2">
                  7. Mantener una comunicación clara y oportuna con los clientes
                  internos y externos.
                </p>
                <p className="mt-2">
                  8. Mantener y velar por el orden de los productos mediante las
                  planimetrías establecidas en cada área.
                </p>

                <p className="mt-2">
                  9. Promover la venta de los artículos y promociones ofrecidos
                  en la tienda.{" "}
                </p>

                <p className="mt-2">
                  10. Realizar todas aquellas tareas inherentes al puesto.
                </p>

                <p className="mt-2">
                  11. Velar por el adecuado manejo de desechos dentro de las
                  tiendas (reciclaje).
                </p>
                <p className="mt-2">
                  12. Velar por el reabastecimiento y suplencia PEPS.
                </p>
              </div>
              <p className="mt-6">
                así como todas aquellas conexas o relacionadas con su categoría
                a partir de la fecha de firma del presente Contrato.
              </p>
              <p className="mt-2">
                El <b>EMPLEADO</b> acatará siempre en todos sus actos las
                órdenes que sus jefes le den, las disposiciones del Reglamento
                Interior de Trabajo, Manual del Trabajador, el Código de Ética
                y/o las políticas, disposiciones y ordenamientos aplicables de
                los cuales tiene pleno conocimiento.
              </p>
            </div>
            <div className="mt-6">
              <p>
                <b>SEGUNDA.- </b>Los servicios contratados en los términos del
                presente Contrato, los desempeñará el EMPLEADO principalmente en
                el domicilio ubicado en{" "}
                <b style={{ backgroundColor: "yellow" }}>{data.direction}</b>. El
                PATRÓN podrá modificar de acuerdo a sus necesidades y previo
                aviso el lugar de prestación de los servicios del EMPLEADO para
                que preste permanente u ocasionalmente sus servicios en un
                domicilio distinto al referido anteriormente.
              </p>
            </div>
            <div className="mt-6">
              <p>
                <b>TERCERA.- </b>El EMPLEADO desempeñará sus servicios bajo la
                dirección y dependencia del PATRÓN, obligándose a cumplir con
                las órdenes y funciones que éste le asigne.
              </p>
              <p className="mt-6">
                Al termino de dicho periodo, de no acreditar el EMPLEADO, que
                satisface los requisitos y conocimientos necesarios para
                desarrollar las labores, a juicio del PATRÓN, tomando en cuenta
                la opinión de la Comisión Mixta de Productividad, Capacitación y
                Adiestramiento, así como la naturaleza de la categoría o puesto,
                se dará por terminada la relación del trabajo, sin
                responsabilidad para el PATRÓN. Debiendo cubrir al EMPLEADO las
                partes proporcionales, de vacaciones, prima vacacional y
                aguinaldo en términos de lo dispuesto en los artículos 76, 80 y
                87 de la Ley Federal del trabajo, así como cualquier otra que
                legalmente le corresponda por el periodo de prueba pactado.
              </p>
              <p className="mt-6">
                El presente Contrato obliga a las partes a lo expresamente
                pactado, por lo que su duración será por Tiempo Indeterminado
                una vez agotado el periodo de prueba mencionado en el párrafo
                que antecede.
              </p>
            </div>
            <div className="mt-6">
              <p>
                <b>CUARTA.- </b>Por los servicios contratados, el EMPLEADO
                recibirá un sueldo mensual de{" "}
                <span style={{ backgroundColor: "yellow" }}>
                  {" "}
                  $9292 (NUEVE MIL DOSCIENTOS NOVENTA Y DOS PESOS) 00/100 M.N.)
                </span>
                , menos los descuentos legales correspondientes, los cuales
                serán pagados por mitad los días 14 (catorce) y el anterior al
                último día de cada mes.
              </p>
              <p className="mt-6">
                El EMPLEADO se obliga a otorgar los días de pago de salarios un
                recibo a favor del PATRÓN por la totalidad de los sueldos
                devengados hasta esa fecha, entendiéndose que el otorgamiento
                del mismo implicará su conformidad en que el sueldo recibido
                cubre el trabajo desempeñado, sin que pueda exigir
                posteriormente pago de prestación alguna; ya que cualquier
                cantidad a la que creyere tener derecho deberá exigirla
                precisamente al otorgar el recibo de referencia. La firma del
                recibo correspondiente implicará un finiquito total para el
                PATRÓN por cualquier clase de sueldos o prestaciones a que
                tuviere derecho el EMPLEADO por los servicios prestados.
              </p>
              <p className="mt-6">
                Por cuestiones de seguridad, en el acto de firmar este contrato,
                el EMPLEADO otorga su consentimiento para que el PATRÓN deposite
                quincenalmente la cantidad que le corresponda por concepto de
                salario en la cuenta de cheques o de tarjeta de débito del
                EMPLEADO, en términos del artículo 101 de la Ley Federal del
                Trabajo.
              </p>
            </div>
            <div className="mt-6">
              <p>
                <b>QUINTA.- </b>La duración de la jornada semanal de trabajo
                será de 48 (cuarenta y ocho) horas la diurna, 42 (cuarenta y
                dos) horas la nocturna y 45 (cuarenta y cinco) horas la mixta y
                será distribuida por el PATRÓN de acuerdo a las necesidades del
                servicio, durante los días de la semana sin que excedan de los
                máximos legales.
              </p>
              <p className="mt-6">
                El EMPLEADO contará con los periodos para descansar o tomar
                alimentos fuera de la fuente de trabajo, de conformidad con las
                necesidades del PATRÓN, siempre respetando los mínimos
                establecidos por la Ley Federal del Trabajo. El horario podrá
                ser modificado en cualquier semana en los términos del artículo
                59 de la Ley Federal del Trabajo.
              </p>
              <p className="mt-6">
                El EMPLEADO faculta expresamente al PATRÓN para que previo aviso
                pueda modificar el horario de trabajo de acuerdo con sus
                necesidades administrativas y de operación.
              </p>
              <p className="mt-6">
                El EMPLEADO no laborará tiempo extra ni en días de descanso
                semanal u obligatorio ni al término de su jornada laboral a
                menos que cuente con instrucción y/o autorización por escrito
                del PATRÓN.
              </p>
            </div>
            <div className="mt-6">
              <p>
                <b>SEXTA.- </b>El EMPLEADO disfrutará semanalmente de1(un) día
                de descanso con goce de sueldo, cuyo salario queda incluido en
                la suma señalada en la cláusula que antecede, por tratarse de
                retribución mensual.
              </p>
              <p className="mt-6">
                El EMPLEADO faculta expresamente al PATRÓN para cambiar el día
                de descanso a que antes se hace mención, de acuerdo con sus
                necesidades administrativas y de operación.
              </p>
            </div>
            <div className="mt-6">
              <p>
                <b>SÉPTIMA.- </b>El EMPLEADO disfrutará de un periodo anual de
                vacaciones en términos del artículo 76 de la Ley Federal del
                Trabajo.
              </p>
              <p className="mt-6">
                El EMPLEADO tendrá derecho a recibir una prima vacacional por el
                equivalente al 25% del salario que le corresponda por sus días
                de vacaciones en términos del artículo 80 de la Ley Federal del
                Trabajo.
              </p>
            </div>
            <div className="mt-6">
              <p>
                <b>OCTAVA.- </b>El EMPLEADO tendrá derecho a recibir 15 (quince)
                días de aguinaldo, conforme a lo dispuesto por el Artículo 87 de
                la Ley Federal del Trabajo, el cual le será cubierto por el
                PATRÓN antes del día veinte de diciembre de cada año.
              </p>
            </div>
            <div className="mt-6">
              <p>
                <b>NOVENA.- </b>Para efectos del presente Contrato, serán
                considerados como días de descanso obligatorio los señalados en
                el Artículo 74 de la Ley Federal del Trabajo, cuyo salario
                también queda pagado con la cantidad señalada en la Cláusula
                Cuarta, por tratarse de sueldo mensual.
              </p>
            </div>
            <div className="mt-6">
              <p>
                <b>DÉCIMA.- </b>El EMPLEADO y el PATRÓN hacen constar que las
                disposiciones de este Contrato comprenden todas las prestaciones
                que legalmente le corresponden al EMPLEADO.
              </p>
            </div>
            <div className="mt-6">
              <p>
                <b>DÉCIMA PRIMERA.- </b>El EMPLEADO se obliga a tomar en
                consideración las reglas que sobre su periodo a prueba
                establezca la Comisión Mixta de Productividad, Capacitación y
                Adiestramiento así como a someterse a los exámenes de
                conocimientos y evaluaciones diseñados de acuerdo con su
                categoría. El negarse a ello será causa suficiente para ser
                separado de su trabajo sin responsabilidad para el PATRÓN, por
                no acreditar ser apto para el trabajo que fue contratado durante
                el periodo de prueba.
              </p>
              <p className="mt-6">
                El PATRÓN se compromete a capacitar y a adiestrar al EMPLEADO,
                de acuerdo con el Plan y los Programas de Capacitación y
                Adiestramiento debidamente registrados ante las autoridades
                competentes.
              </p>
            </div>
            <div className="mt-6">
              <p>
                <b>DÉCIMA SEGUNDA .- </b>El EMPLEADO reconoce que a la fecha de
                celebración de este Contrato no tiene ningún conflicto de
                interés en relación con los servicios que prestará al PATRÓN.
                Por lo tanto, se compromete a comunicar al mismo cualquier
                conflicto que llegara a surgir. El hecho de que el EMPLEADO
                ocultase la existencia de un conflicto de interés será causa
                suficiente para que el PATRÓN de por terminada la relación de
                trabajo sin responsabilidad para el mismo.
              </p>
            </div>
            <div className="mt-6">
              <p>
                <b>DÉCIMA TERCERA. - </b>El EMPLEADO en este acto designa como
                único y exclusivo beneficiario del 100% de los salarios y
                prestaciones devengados y no cobrados ya sea por su muerte o
                desaparición derivada de un acto delincuencial al C.
                ______________, siendo que para el caso de desaparición forzosa
                deberá exhibir dicho beneficiario la Declaración Especial de
                Ausencia emitida por la autoridad competente.
              </p>
              <p className="mt-6">
                Ambas Partes reconocen que el pago de los salarios y
                prestaciones devengados y no cobrados tratándose de persona
                desaparecida no significa el término de la relación de trabajo
                en términos del artículo 133 fracción XVI de la Ley Federal del
                Trabajo.
              </p>
            </div>
            <div className="mt-6">
              <p>
                <b>DÉCIMA CUARTA.- </b>El presente Contrato deja sin efectos
                legales cualquier otro convenio, contrato o acuerdo previo, ya
                sea que haya sido celebrado de manera escrita, verbal o por
                cualquier otra forma.
              </p>
            </div>
            <div className="mt-6">
              <p>
                <b>DÉCIMA QUINTA.- </b>Las partes convienen en que en lo
                previsto en el presente Contrato se regirá por las disposiciones
                de la Ley Federal del Trabajo, y en que para todo lo que se
                refiera a la interpretación, ejecución y cumplimiento del mismo,
                se someterán expresamente a la jurisdicción y competencia de la
                Junta Federal de Conciliación y Arbitraje.
              </p>
              <p className="mt-6">
                Leído íntegramente por las partes el presente Contrato, lo
                ratificaron y firmaron de conformidad en Quintana Roo el día{" "}
                <b style={{ backgroundColor: "yellow" }}>{fechaFormateada}</b>.
              </p>
            </div>
            <div className="flex justify-center mt-6">
              <table
                style={{ width: "100%", maxWidth: "800px" }}
                class="border-collapse border border-black"
              >
                <tr>
                  <td class="border border-black px-4 py-2">EL PATRÓN </td>
                  <td class="border border-black px-4 py-2">EL EMPLEADO</td>
                </tr>

                <tr>
                  <td class="border border-black px-4 py-2">
                    <p>Servicios Comerciales Del Sur, S.A. De C.V. </p>
                    <p>Sr. Rolando Zúñiga Rodríguez </p>
                    <p>Representante Legal </p>
                  </td>
                  <td class="border border-black px-4 py-2">
                  <b style={{ backgroundColor: "yellow" }}>{data.name} {data.lastname}</b>
                    <p>Por su propio derecho</p>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </A4Page>
      </div>
    </div>
  );
}

export default Contrato_pdf;

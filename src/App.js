
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Buscar from "./components/Buscar";
import Totales from "./components/Totales";
import useFetch from "./useFetch";



function App() {

  const { datosApi } = useFetch(`${process.env.REACT_APP_API_URL}`);
  const datosApiFiltrados = datosApi.filter(facturas => facturas.tipo === "ingreso");

  const cambiarFormatoFecha = (fecha) => {
    const nuevaFecha = DateTime.fromMillis(Number(fecha)).toLocaleString();
    return nuevaFecha;
  };


  const calculaVencimiento = (fecha) => {
    const fechaFormato = DateTime.fromMillis(Number(fecha));
    const hoyFromato = DateTime.now();
    const diferencia = `${Math.round(hoyFromato.diff(fechaFormato, ["days"]).days)}`;
    if (diferencia >= 0) {
      return `${cambiarFormatoFecha(fecha)} (faltan ${diferencia} días)`;
    } else {
      return `${cambiarFormatoFecha(fecha)} (hace ${-diferencia} días)`;;
    }
  };

  const calcularIva = (base, tipoIva) => {
    const calculoIva = Math.round((base * tipoIva) / 100);
    return calculoIva + `€ (${tipoIva}%)`;
  };

  const calcularTotal = (base, tipoIva) => {
    const calculoIva = Math.round((base * tipoIva) / 100);
    return base + calculoIva + "€";
  };

  return (
    <>
      <Container as="section" className="principal" fluid={true}>
        <Row as="header" className="cabecera">
          <Col as="h2">Listado de ingresos</Col>
        </Row>
        <main>
          <Row >
            <Col className="info-listado info-listado-top text-right">
              <Buscar />
            </Col>
          </Row>
          <table className="listado table table-striped table-bordered table-hover">
            <thead className="thead-light">
              <tr>
                <th className="col-min">Num.</th>
                <th className="col-med">Fecha</th>
                <th className="col-concepto">Concepto</th>
                <th className="col-med">Base</th>
                <th className="col-max">IVA</th>
                <th className="col-med">Total</th>
                <th className="col-max">Estado</th>
                <th className="col-max">Vence</th>
              </tr>
            </thead>
            <tbody>
              {
                datosApiFiltrados.map(facturas => (
                  <tr key={facturas.id}>
                    <td>{facturas.numero}</td>
                    <td>{cambiarFormatoFecha(facturas.fecha)}</td>
                    <td>{facturas.concepto}</td>
                    <td>{facturas.base + "€"}</td>
                    <td>{calcularIva(facturas.base, facturas.tipoIva)}</td>
                    <td>{calcularTotal(facturas.base, facturas.tipoIva)}</td>
                    <td className={facturas.abonada ? " verdadero" : " falso"}>
                      {facturas.abonada ? "Abonada" : "Pendiente"}</td>
                    <td className={facturas.abonada ? " verdadero" : " falso"}>
                      {facturas.abonada ?
                        "-" :
                        calculaVencimiento(facturas.vencimiento)}</td>
                  </tr>
                ))
              }
            </tbody>
            <Totales />
          </table>
        </main>
      </Container>
      <div className="loading off">
        <img src="img/loading.svg" alt="cargando" />
      </div>
    </>
  );
}

export default App;

const listaFacturas = document.querySelector(".listado");
const filaMolde = document.querySelector(".factura-dummy");
const totalBases = document.querySelector(".totales .total-bases");
const totalIVAs = document.querySelector(".totales .total-ivas");
const totalTotales = document.querySelector(".totales .total-totales");
const spinner = document.querySelector(".loading");

const total = {
  bases: 0,
  ivas: 0,
  totales: 0
};

const cantidadIVA = (base, tipoIVA) => base * (tipoIVA / 100);
const totalFactura = (base, tipoIVA) => base + cantidadIVA(base, tipoIVA);
const textoEstado = abonada => (abonada ? "Abonada" : "Pendiente");
const claseEstado = abonada => (abonada ? "table-success" : "table-danger");

const textoColorVencimiento = (abonada, vencimiento) => {
  if (abonada) {
    return {
      texto: "-",
      clase: "table-success"
    };
  }
  const fechaVencimiento = DateTime.fromMillis(+vencimiento);
  const fechaHoy = DateTime.local();
  const difFechas = fechaVencimiento.diff(fechaHoy, "days").toObject();
  const diasDif = Math.abs(Math.trunc(difFechas.days));
  if (fechaVencimiento > fechaHoy) {
    return {
      texto: `${fechaVencimiento.toLocaleString()} (faltan ${diasDif} días)`,
      clase: "table-success"
    };
  } else {
    return {
      texto: `${fechaVencimiento.toLocaleString()} (hace ${diasDif} días)`,
      clase: "table-danger"
    };
  }
};

const pintarFacturas = listadoFacturas => {
  for (const factura of listadoFacturas) {
    const cantidadIVAFactura = cantidadIVA(factura.base, factura.tipoIva);
    const importeTotalFactura = totalFactura(factura.base, factura.tipoIva);
    total.bases += factura.base;
    total.ivas += cantidadIVAFactura;
    total.totales += importeTotalFactura;
    // Recorrer facturas, por cada factura:
    // - Clonar la fila molde
    const nuevaFilaFactura = filaMolde.cloneNode(true);
    nuevaFilaFactura.classList.remove("factura-dummy");
    // - Rellenar la nueva fila con los datos de cada factura
    //    - Rellenar datos básicos
    const fechaFacturaFormateada = DateTime.fromMillis(+factura.fecha).toLocaleString();
    nuevaFilaFactura.querySelector(".numero").textContent = factura.numero;
    nuevaFilaFactura.querySelector(".fecha").textContent = fechaFacturaFormateada;
    nuevaFilaFactura.querySelector(".concepto").textContent = factura.concepto;
    nuevaFilaFactura.querySelector(".base").textContent = factura.base.toFixed(2);
    //    - Calcular la cantidad de IVA a partir de la base y el tipo de IVA
    nuevaFilaFactura.querySelector(".cantidad-iva").textContent = cantidadIVAFactura;
    nuevaFilaFactura.querySelector(".tipo-iva").textContent = factura.tipoIva;
    //    - Calcular el total de la factura a partir de la base y el tipo de IVA
    nuevaFilaFactura.querySelector(".total").textContent = importeTotalFactura.toFixed(2);
    //    - Obtener la palabra "Abonada" o "Pendiente" según el estado
    nuevaFilaFactura.querySelector(".estado").textContent = textoEstado(factura.abonada);
    //    - Obtener la clase "table-success" o "table-danger" según el estado
    nuevaFilaFactura.querySelector(".estado").classList.add(claseEstado(factura.abonada));
    //    - Según la fecha de vencimiento tengo que obtener:
    //      · si está abonada, el texto "-" y la clase "table-success"
    //      · si no está abonada y ha vencido, el texto "hace x días" y la clase "table-danger"
    //      · si no está abonada y no ha vencido, el texto "faltan x días" y la clase "table-danger"
    const infoVencimiento = textoColorVencimiento(factura.abonada, factura.vencimiento);
    nuevaFilaFactura.querySelector(".vencimiento").textContent = infoVencimiento.texto;
    nuevaFilaFactura.querySelector(".vencimiento").classList.add(infoVencimiento.clase);
    // - Insertar la nueva fila en la tabla
    listaFacturas.querySelector("tbody").append(nuevaFilaFactura);
  }
};

const pintarTotales = totales => {
  totalBases.textContent = totales.bases.toFixed(2);
  totalIVAs.textContent = totales.ivas.toFixed(2);
  totalTotales.textContent = totales.totales.toFixed(2);
};

const cargarFacturas = async () => {
  spinner.classList.remove("off");
  const resp = await fetch(urlApi);
  const facturasJSON = await resp.json();
  spinner.classList.add("off");
  pintarFacturas(facturasJSON.filter(facturaJSON => facturaJSON.tipo === "ingreso"));
  pintarTotales(total);
};
cargarFacturas();

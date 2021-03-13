import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [datosApi, setDatosApi] = useState([]);
  useEffect(() => {
    if (url) {
      fetch(url)
        .then(datos => datos.json())
        .then(datosApi => setDatosApi(datosApi));
    }
  }, [url]);
  return {
    datosApi
  };
};

export default useFetch;

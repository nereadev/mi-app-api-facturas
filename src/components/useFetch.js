import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [datosApi, setDatosApi] = useState(null);
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

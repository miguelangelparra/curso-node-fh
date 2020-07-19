const axios = require("axios");

const getLugarLatLong = async (dir) => {
  //Transforma a formato valido para URL
  const encodedURL = encodeURI(dir);

  const instance = axios.create({
    baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodedURL}`,
    timeout: 1000,
    headers: {
      "X-RapidAPI-Key": "2d22a574f6mshc0f635a56ec8153p1f7eaajsn5284e9e5fa2f",
    },
  });

  //Optimizacion
  //   instance.get()
  //   .then(res=>console.log(res.data.Results))
  //   .catch(err =>console.log("Error!",err))
  // }

  const resp = await instance.get();
console.log(resp)
  if (resp.data.Results.length ) {
    throw new Error(`No hay resultados para ${direccion}`);
  }

  const data = resp.data.Results[0];
  const direccion = data.name;
  const lat = data.lat;
  const lng = data.lon;

  return {
    direccion,
    lat,
    lng,
  };
};

module.exports = {
  getLugarLatLong,
};



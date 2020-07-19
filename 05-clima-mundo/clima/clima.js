const axios = require("axios");
const API_KEY = "205d93ee309786e6683b6dd9784ab06d";

const getClima = async (lat, lon) => {
 const respuesta = await  axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  return respuesta.data.main.temp
};

module.exports = {
  getClima,
};

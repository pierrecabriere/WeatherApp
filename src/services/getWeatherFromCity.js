import axios from "axios";

export async function getWeatherFromCity(city, token) {
  try {
    const responseApi = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${token}`
    );
    return responseApi.data;
  } catch (e) {
    console.log("ERROR IN GET WEATHER IS :", e);
    return "ERROR";
  }
}

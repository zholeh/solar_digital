import { toCity, toCityFromID, toCityFrom5Day } from "./ConvertJSON";

const APPID = "60952053378325080fa54cf4217e7e7f";
const URL = "https://api.openweathermap.org/data/2.5/";
const API_HEADERS = {};

export async function getCitiesByName(name) {
  const FUNC = "find";
  const query = `${URL}${FUNC}?q=${name}&type=like&appid=${APPID}`;
  let result = [];

  if (name.length > 3) {
    try {
      const response = await fetch(query, { headers: API_HEADERS });
      const data = await response.text();
      result = toCity(data);
    } catch (error) {
      // console.log('Error fetching and parsing data', error);
    }
  }
  return result;
}

export async function getCitiesByGeo(lat, lon) {
  const FUNC = "weather";
  const query = `${URL}${FUNC}?lat=${lat}&lon=${lon}&appid=${APPID}`;
  let result = [];

  if (!!lat && !!lon) {
    try {
      const response = await fetch(query, { headers: API_HEADERS });
      const data = await response.json();
      result = data;
    } catch (error) {
      // console.log('Error fetching and parsing data', error);
    }
  }
  return result;
}

export async function getCitiesById(param) {
  const id = '' + param
  const FUNC = "group";
  const query = `${URL}${FUNC}?id=${id}&appid=${APPID}`;
  let result = [];

  if (id.length > 0) {
    try {
      const response = await fetch(query, { headers: API_HEADERS });
      const data = await response.text();
      result = toCityFromID(data);
    } catch (error) {
      // console.log('Error fetching and parsing data', error);
    }
  }
  return result;
}

export async function getCities5ById(id) {
  const FUNC = "forecast";
  const query = `${URL}${FUNC}?id=${id}&appid=${APPID}`;
  let result = [];

  try {
    const response = await fetch(query, { headers: API_HEADERS });
    const data = await response.text();
    result = toCityFrom5Day(data);
  } catch (error) {
    // console.log('Error fetching and parsing data', error);
  }
  return result;
}

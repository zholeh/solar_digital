import { getCitiesByName, getCitiesByGeo } from "../../API/http";

export async function getCities(name) {
  const resp = await getCitiesByName(name);

  const result = {
    citiesList: [],
    fetchError: true
  };

  if (resp.cod === "200") {
    result.citiesList = resp.list;
    result.fetchError = false;
  } else result.fetchError = true;

  return result;
}

export async function findByGeo(callback) {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  async function success(pos) {
    const resp = await getCitiesByGeo(pos.coords.latitude, pos.coords.longitude);
    const result = { citiesList: [], fetchError: true };

    if ("" + resp.cod === "200") {
      resp.country = resp.sys.country;
      result.citiesList = [resp];
      result.fetchError = false;
    }
    callback(result);
  }

  function error() {
    const result = {
      citiesList: [],
      fetchError: true
    };
    callback(result);
  }

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }
}
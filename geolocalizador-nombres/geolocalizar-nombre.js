const handleFetch = async (url) => {
  const res = await fetch(url);
  return await handleError(res);
};
const handleError = (res) => {
  if (!res.ok) throw new Error(res.statusText);
  return res;
};
const averiguarPais = async (nombre) => {
  let url = `https://api.nationalize.io/?name=${nombre}`;
  let res = await handleFetch(url);
  let resJSON = await res.json();
  let paisMasProb = resJSON.country.reduce((a, b) => {
    return a.probability > b.probability ? a : b;
  }, 0);
  const codPais = paisMasProb.country_id;
  url = `https://restcountries.com/v3.1/alpha/${codPais}`;
  res = await handleFetch(url);
  resJSON = await res.json();
  return {
    nombre: resJSON[0].translations.spa.common,
    bandera: resJSON[0].flags.png
  };
};

module.exports = {
  averiguarPais // averiguarPais: averiguarPais
}

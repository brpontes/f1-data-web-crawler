const api = require("../api");

const getResultsByType = (type, year) => {
  return new Promise(async (resolve, reject) => {
    api
      .get(`/results/${year}/${type}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = {
  byDrivers: (year) => getResultsByType("drivers", year),
  byTeams: (year) => getResultsByType("team", year),
  byRaces: (year) => getResultsByType("races", year),
};

const axios = require("axios");

const api = axios.create({
  baseURL: "https://www.formula1.com/en",
});

module.exports = api;

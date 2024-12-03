const { HttpStatusCode } = require("axios");
const cheerio = require("cheerio");
const results = require("../modules/results");

const byDrivers = async (req, res) => {
  const { year = new Date().getFullYear() } = req.params;
  const drivers = await results.byDrivers(year);
  const $ = cheerio.load(drivers);
  const driverStandings = {};

  $(".f1-table tbody")
    .children()
    .each(function () {
      const position = $(this).find("td:nth-child(1)").text();
      const driver = $(this)
        .find("td:nth-child(2)")
        .text()
        .replace(/\u00A0/g, " ");
      const initials = driver.slice(-3);
      const nationality = $(this).find("td:nth-child(3)").text();
      const team = $(this).find("td:nth-child(4)").text();
      const points = $(this).find("td:nth-child(5)").text();

      driverStandings[position] = {
        driver: driver.slice(0, -3),
        initials,
        nationality,
        team,
        points,
      };
    });

  res.writeHead(HttpStatusCode.Ok, { "Content-Type": "application/json" });
  res.end(JSON.stringify(driverStandings, null, 2));
};

const byTeams = async (req, res) => {
  const { year = new Date().getFullYear() } = req.params;
  const teams = await results.byTeams(year);
  const $ = cheerio.load(teams);
  const teamStandings = {};

  $(".f1-table tbody")
    .children()
    .each(function () {
      const position = $(this).find("td:nth-child(1)").text();
      const team = $(this).find("td:nth-child(2)").text();
      const points = $(this).find("td:nth-child(3)").text();

      teamStandings[position] = {
        team,
        points,
      };
    });

  res.writeHead(HttpStatusCode.Ok, { "Content-Type": "application/json" });
  res.end(JSON.stringify(teamStandings, null, 2));
};

module.exports = {
  byDrivers,
  byTeams,
};

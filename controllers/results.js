const { HttpStatusCode } = require("axios");
const cheerio = require("cheerio");
const results = require("../modules/results");

const byRaces = async (req, res) => {
  const { year = new Date().getFullYear() } = req.params;
  const races = await results.byRaces(year);
  const $ = cheerio.load(races);
  const racesResults = {};

  $(".f1-table tbody")
    .children()
    .each(function () {
      const gp = $(this).find("td:nth-child(1)").text();
      const date = $(this).find("td:nth-child(2)").text();
      const winner = $(this).find("td:nth-child(3)").text().slice(0, -3);
      const team = $(this).find("td:nth-child(4)").text();
      const laps = $(this).find("td:nth-child(5)").text();
      const time = $(this).find("td:nth-child(6)").text();

      racesResults[gp] = {
        date,
        winner,
        team,
        laps,
        time,
      };
    });

  res.writeHead(HttpStatusCode.Ok, { "Content-Type": "application/json" });
  res.end(JSON.stringify(racesResults, null, 2));
};

module.exports = {
  byRaces,
};

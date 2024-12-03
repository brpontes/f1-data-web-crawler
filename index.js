const polka = require("polka");
const resultsController = require("./controllers/results");
const standingsController = require("./controllers/standings");

polka()
  .get("/standings/drivers/:year?", standingsController.byDrivers)
  .get("/standings/teams/:year?", standingsController.byTeams)
  .get("/results/races/:year?", resultsController.byRaces)
  .listen(3000, (err) => {
    if (err) throw err;

    console.log(`Running on localhost:3000`);
  });

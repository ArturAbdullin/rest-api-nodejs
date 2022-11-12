// import a built-in http node module
const http = require("http");
const {
  getVehicles,
  getVehicle,
  createVehicle,
} = require("./controllers/vehicleController");
const { parseId } = require("./utils");

// create an http server
const server = http.createServer((req, res) => {
  if (req.url === "/api/vehicles" && req.method === "GET") {
    getVehicles(req, res);
  } else if (
    req.url.match(/\/api\/vehicles\/([a-z0-9-]+)/) &&
    req.method === "GET"
  ) {
    const id = parseId(req.url);
    getVehicle(req, res, id);
  } else if (req.url === "/api/vehicles" && req.method === "POST") {
    createVehicle(req, res);
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
});

// create a port to run the server on
// check if there is an environments port variable
// if there isn't then use port 5000
const PORT = process.env.PORT || 5000;

// start listening on the configured port
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

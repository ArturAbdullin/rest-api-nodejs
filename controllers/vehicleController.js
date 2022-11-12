// these are just for the typing sake
const { IncomingMessage, ServerResponse } = require("http");

const VehicleDatabase = require("../models/vehicleModel");
const ContentType = {
  _contentType: "Content-Type",
  get applicationJSON() {
    return { [this._contentType]: "application/json" };
  },
};

/**
 * Return a Promise to return vehicles from the database
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
async function getVehicles(req, res) {
  try {
    // findAll returns a Promise -> use await
    const vehicles = await VehicleDatabase.findAll();

    // write to the response head
    // status OK = 200
    // Content-Type = applicaton/json as we return .json data
    res.writeHead(200, ContentType.applicationJSON);
    // write and simultaneously end the response
    res.end(JSON.stringify(vehicles));
    // the above line is a shorthand for
    // res.write(JSON.stringify(vehicles));
    // res.end();
  } catch (error) {
    console.log(error);
  }
}

/**
 * Return a Promise to return a vehicle from the database by id
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
async function getVehicle(req, res, id) {
  try {
    const vehicle = await VehicleDatabase.findById(id);
    if (!vehicle) {
      res.writeHead(404, ContentType.applicationJSON);
      res.end(JSON.stringify({ message: "Vehicle Not Found" }));
    } else {
      res.writeHead(200, ContentType.applicationJSON);
      res.end(JSON.stringify(vehicle));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getVehicles,
  getVehicle
};

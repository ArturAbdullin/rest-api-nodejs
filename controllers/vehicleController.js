// these are just for the typing sake
const { IncomingMessage, ServerResponse } = require("http");

const VehicleDatabase = require("../models/vehicleModel");
const { getPostBody } = require("../utils");
const ContentType = {
  _contentType: "Content-Type",
  get applicationJSON() {
    return { [this._contentType]: "application/json" };
  },
};

/**
 * Response with all the enties from the vehicles database
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
 * Response with the specified entry from the vehicles database
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {string} id
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

/**
 * Create an entry in the vehicles database
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
async function createVehicle(req, res) {
  try {
    const body = await getPostBody(req);
    const { vehicle, price, description } = JSON.parse(body);

    const vehicleData = {
      vehicle,
      price,
      description,
    };

    const newVehicle = await VehicleDatabase.createEntry(vehicleData);

    res.writeHead(201, ContentType.applicationJSON);
    res.end(JSON.stringify(newVehicle));
  } catch (error) {
    console.log(error);
  }
}

/**
 * Update an entry in the vehicles database
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {string} id
 */
async function updateVehicle(req, res, id) {
  try {
    const oldVehicleData = await VehicleDatabase.findById(id);

    if (!oldVehicleData) {
      res.writeHead(404, ContentType.applicationJSON);
      res.end(JSON.stringify({ message: "Vehicle Not Found" }));
    } else {
      const body = await getPostBody(req);
      const { vehicle, price, description } = JSON.parse(body);

      const vehicleData = {
        ...oldVehicleData,
        vehicle: vehicle || oldVehicleData.vehicle,
        price: price || oldVehicleData.price,
        description: description || oldVehicleData.description,
      };

      const updatedVehicle = await VehicleDatabase.updateEntry(id, vehicleData);

      res.writeHead(201, ContentType.applicationJSON);
      res.end(JSON.stringify(updatedVehicle));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
};

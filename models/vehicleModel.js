// utils
const { v4: uuidv4 } = require("uuid");
const { writeDataToFile } = require("../utils");

// the object that represents the type of the database entry
const VehicleType = {
  id: "id",
  vehicle: "vehicleName",
  price: "vehiclePrice",
  description: "vehicleDescription",
};

// import local database (.json file)
/**
 * @type {VehicleType[]}
 */
let vehicles = require("../data/vehicles");

/**
 * Return a Promise to return all vehicles in the database
 * @returns {Promise<vehicles>}
 */
function findAll() {
  return new Promise((resolve, reject) => {
    resolve(vehicles);
  });
}

/**
 * Return a Promise to return a vehicle from the database by id
 * @param {string} id
 * @returns {Promise<VehicleType>}
 */
function findById(id) {
  return new Promise((resolve, reject) => {
    const vehicle = vehicles.find((v) => v.id === id);
    resolve(vehicle);
  });
}

/**
 * Return a Promise to create an entry in the vehicles database
 * @param {VehicleType} vehicle
 * @returns {Promise<VehicleType>}
 */
function createEntry(vehicle) {
  return new Promise((resolve, reject) => {
    const newVehicle = { id: uuidv4(), ...vehicle };
    vehicles.push(newVehicle);
    writeDataToFile("./data/vehicles.json", vehicles);
    resolve(newVehicle);
  });
}

/**
 *
 * @param {string} id
 * @param {VehicleType} vehicle
 * @returns {Promise<VehicleType>}
 */
function updateEntry(id, vehicle) {
  return new Promise((resolve, reject) => {
    const index = vehicles.findIndex((v) => v.id === id);
    vehicles[index] = { ...vehicle };
    writeDataToFile("./data/vehicles.json", vehicles);
    resolve(vehicles[index]);
  });
}

/**
 * Return a Promise to delete a vehicle from the database by id
 * @param {string} id
 * @returns {Promise<void>}
 */
function removeEntry(id) {
  return new Promise((resolve, reject) => {
    vehicles = vehicles.filter((v) => v.id !== id);
    writeDataToFile("./data/vehicles.json", vehicles);
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  createEntry,
  updateEntry,
  removeEntry,
};

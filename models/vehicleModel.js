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
const vehicles = require("../data/vehicles");

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

module.exports = {
  findAll,
  findById
};

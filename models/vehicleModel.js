// import local database (.json file)
/**
 * @type {{id: number, vehicle: string, price: string, description: string}[]}
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
 * @param {number} id
 * @returns {Promise<{id: number, vehicle: string, price: string, description: string}>}
 */
function findById(id) {
  return new Promise((resolve, reject) => {
    const vehicle = vehicles.find(v => v.id === id);
    resolve(vehicle);
  });
}

module.exports = {
  findAll,
  findById
};

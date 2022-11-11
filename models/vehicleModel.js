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

module.exports = {
  findAll,
};

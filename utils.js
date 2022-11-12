const fs = require("fs");

/**
 * Writes data to the file.
 * @param {string} filename
 * @param {any} content
 */
function writeDataToFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), "utf-8", (err) => {
    console.log(err);
  });
}

module.exports = {
  writeDataToFile,
};

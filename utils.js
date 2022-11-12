const fs = require("fs");
const { IncomingMessage } = require("http");

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

/**
 * Return a Promise to get a POST request body
 * @param {IncomingMessage} req
 * @returns {Promise}
 */
function getPostBody(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        resolve(body);
      })
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Parse a vehicle id from the url
 * @param {IncomingMessage.url} url
 * @returns {string}
 */
function parseId(url) {
  return url.split("/")[3];
}

module.exports = {
  writeDataToFile,
  getPostBody,
  parseId
};

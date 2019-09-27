const request = require('request');


const fetchMyIP = function(callback) {
  request(`https://api.ipify.org?format=json`, function(error, response, body) {
    if (error) {
      callback(`There is a error` + error, null);
    } else if (response.statusCode !== 200) {
      const msg = `status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      let ip = JSON.parse(body).ip;
      callback(error, ip);
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/${ip}`, function(error, response,body) {
    if (error) {
      callback(`there is a error` + error, null);
    } else if (response.statusCode !== 200) {
      const msg = `status code ${response.statusCode} when get la & lo. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      let latitude = JSON.parse(body).data.latitude;
      let longitude = JSON.parse(body).data.longitude;
      callback(error, {latitude, longitude});
    }
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  let la = coords.latitude;
  let lon = coords.longitude;
  request(`http://api.open-notify.org/iss-pass.json?lat=${la}&lon=${lon}`, function(error, response, body) {
    if (error) {
      callback(`there is a error` + error, null);
    } else if (response.statusCode !== 200) {
      const msg = `status code ${response.statusCode} when get la & lo. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      let data = JSON.parse(body);
      callback(error, data);
    }
  });
};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};


module.exports = { fetchMyIP };
module.exports = { fetchCoordsByIP };
module.exports = { fetchISSFlyOverTimes };
module.exports = { nextISSTimesForMyLocation };

const request = require('request-promise-native');

const fetchMyIP = function() {
  return request (`https://api.ipify.org?format=json`);
};

const fetchCoordsByIP = function (body) {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/${ip}`);
}

const fetchISSFlyOverTimes = function (body) {
  let la = JSON.parse(body).data.latitude;
  let lon = JSON.parse(body).data.longitude;
  return request (`http://api.open-notify.org/iss-pass.json?lat=${la}&lon=${lon}`);
}

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then (fetchCoordsByIP)
    .then (fetchISSFlyOverTimes)
    .then (function(data) {
      const { response } = JSON.parse(data);
      return response;
    })
}


module.exports = { nextISSTimesForMyLocation };
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } =require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log(`it didn't work`, error);
    return;
  } else {
    console.log(`it worked: return IP`, ip);
  }
});


fetchCoordsByIP('66.207.199.230', (error, data) => {
  if (error) {
    console.log(`it didn't work`, error);
    return;
  } else {
    console.log(`it worked: return data`, data);
  }
});

const coords = { latitude: '43.63830', longitude: '-79.43010' };

fetchISSFlyOverTimes(coords, (error, data) => {
  if (error) {
    console.log('error:', error);
  } else {
    console.log('it worked:', data);
  }
});


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  console.log(passTimes);
});




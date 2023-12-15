const request = require("request");

const geocode = (address, callback) => {
  const geoCodeUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiYWhtZWRlc3NhbTMyNzAiLCJhIjoiY2xwZnZoM2Y2MXdoczJqbms5dGplYnZ3MCJ9.M-ShZrdzrHCtwvu2ytZMLw";

  request({ url: geoCodeUrl, json: true }, (error, response) => {
    if (error) {
      callback("UNABLE TO CONNECT TO GEOCODE", undefined);
    } else if (response.body.message) {
      // this must be prior to the next condition cause now there is no features object
      callback(response.body.message, undefined);
    } else if (response.body.features.length === 0) {
      callback("UNABLE TO FIND LOCATION", undefined);
    } else {
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
      });
    }
  });
};

module.exports = geocode;

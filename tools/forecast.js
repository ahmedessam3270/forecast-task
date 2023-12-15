const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "https://api.weatherapi.com/v1/current.json?key=0892ace1384940078d9124608232611&q=" +
    longitude +
    "," +
    latitude;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("AN ERROR HAS OCCURED", undefined);
    } else if (response.body.error) {
      callback(response.body.error.message, undefined);
    } else {
      callback(
        undefined,
        response.body.location.name +
          " is " +
          response.body.current.condition.text +
          " and it's temperature is " +
          response.body.current.temp_c +
          " At the longitude of " +
          longitude +
          " At the latitude of  " +
          latitude
      );
    }
  });
};

module.exports = forecast;

const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWtpbXNlcmlrIiwiYSI6ImNrZjU3Ym83YTBrMnYyem5vN3F2dzIxZzQifQ.MS2OoVGK7BZqmL5bStWVqA&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect`, undefined);
    } else if (!body.features.length) {
      callback(`Invalid input`, undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;

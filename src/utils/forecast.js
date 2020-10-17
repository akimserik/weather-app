const request = require("postman-request");

const forecast = (ltd, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=45e4ff4680706652a4f219cfc3622614&query=${ltd},${lng}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect", undefined);
    } else if (!body.current) {
      callback("Invalid coordinates", undefined);
    } else {
      const { temperature, feelslike, weather_descriptions } = body.current;
      const weaDesStr = weather_descriptions.join(".");
      callback(
        undefined,
        `${weaDesStr}. It is currently ${temperature} degrees out. It feels like ${feelslike}`
      );
    }
  });
};

module.exports = forecast;

const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Defines paths for Express
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const publicDirectoryPath = path.join(__dirname, "../public");

// Setup Paths
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Inventas",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is a help message",
    name: "Inventas",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Inventas",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  const address = req.query.address;

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error });

    forecast(latitude, longitude, (error, forecast) => {
      if (error) return res.send({ error });
      res.send({ address, location, forecast });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Help article was not found",
    name: "Inventas",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Page was not found",
    name: "Inventas",
  });
});

app.listen(port, () => {
  console.log(`Server started at port ${port}...`);
});

// test change for GIT

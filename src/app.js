const express = require("express");
const app = express();

// ******EXCEPTIONAL IMPORTANT TO HAVE *****************************************************************************
// Serve static files from the 'public' directory
app.use(express.static("public"));

// it depends to the port given from the company giving you the domain to make the app accessible
const port = process.env.PORT || 3000;

/// TO MAKE ANY EDIT TO RUN TO THE PROGRAM AND WITHOUT CLOSE THE PROGRAM EACH TIME AND RUN IT AGAIN
/// we use the pacakage called nodemon -g (to make it global)

// CAUSE THERE WILL BE A CONFLICT BETWEEN THIS LINE OF CODE AND THE DISPLAYIN THE STATIC PAGE
app.get("/about", (req, res) => {
  res.send("This is the data in about page");
});

var hbs = require("hbs");
const path = require("path");
app.set("view engine", "hbs");

const viewsDirectory = path.join(__dirname, "../temp2/views");
const partialsDirectory = path.join(__dirname, "../temp2/partials");
app.set("views", viewsDirectory);
hbs.registerPartials(partialsDirectory);
app.get("/", (req, res) => {
  res.render("index", {
    title: "HOME",
    desc: "this is the home page",
  });
});

app.get("/weather", async (req, res) => {
  try {
    const data = await fetchHandler(req.query.address);
    console.log("data after fetch", data);

    res.render("weather", {
      title: "weather page",
      location: data.location,
      forecast: data.forecast,
    });
  } catch (e) {
    console.log(e);
    res.render("weather", {
      title: "weather page",
      error: e,
    });
  }
});

///////////////////////////////////////////////////////////////////////
const forecast = require("../tools/forecast");
const geocode = require("../tools/geocode");

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you shall enter a proper country name",
    });
  }

  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    forecast(data.latitude, data.longitude, (error, response) => {
      if (error) {
        return res.send({ error });
      }
      geocode(address);

      res.send({
        location: req.query.address,
        forecast: response,
      });
    });
  });
});

const fetchHandler = async (address) => {
  console.log("fetch handler", address);
  return new Promise((resolve, reject) => {
    if (!address) {
      reject("Address must be provided");
    }

    geocode(address, (geocodeError, geocodeData) => {
      if (geocodeError) {
        reject(geocodeError);
      }

      const { latitude, longitude } = geocodeData;

      forecast(latitude, longitude, (forecastError, forecastData) => {
        if (forecastError) {
          reject(forecastError);
        }

        resolve({
          location: address,
          forecast: forecastData,
        });
      });
    });
  });
};

////////////////////////////////////////////////////////////////////

app.get("*", (req, res) => {
  res.send("<h2>Error 404 Page Not Found </h2>");
});

/////////////////////////////////////////////////////////////////////////////////////////
// must be the last code in my application, and without it my application will not work
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", (req, res) => {
  var place = req.body.city;
  const apikey = "161e0577f9b04ba5b9f151512222106";
  const url =
    "https://api.weatherapi.com/v1/current.json?key=" +
    apikey +
    "&q=" +
    place +
    "&aqi=yes";
    console.log(url);
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weather = JSON.parse(data);
      console.log(weather);
      const temp = weather.current.temp_c;
      const icon = weather.current.condition.icon;
      console.log(temp);
      console.log(url);
      res.write(
        "<h1>the temp in" +
          " " +
          place +
          " " +
          "is:" +
          " " +
          temp +
          " " +
          "degree celsius</h1>"
      );
      res.write("<img src= " + icon + ">");
      res.send();
    });
  });
});

app.listen(2500, function () {
  console.log("server is running on port 2500");
});

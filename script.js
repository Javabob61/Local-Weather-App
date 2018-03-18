var measurementType = "imperial"; // variables for metric or imperial measurements.
var speedType = "mph";
var degreeChar = "&#8457";
getLocation();

function metricToggle() {
  if (measurementType === "imperial") {
    measurementType = "metric"; // measurementType is used in call to OpenWeatherMap
    speedType = "kph";
    degreeChar = "&#8451";
  } else if (measurementType === "metric") {
    measurementType = "imperial";
    speedType = "mph";
    degreeChar = "&#8457";
  }
  getLocation();
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  // fyi Keller is 32.9 -97.3
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  lat = lat.toFixed(1);
  lon = lon.toFixed(1);
  //alert(lon);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      document.getElementById("town").innerHTML = myObj.name; // city name
      document.getElementById("conditions").innerHTML = myObj.weather[2].main; // current conditions.

      //alert(myObj.weather[2].icon) // use this alert to check weather icon numbering.

      var body = document.getElementsByTagName("body")[0]; // Grabs control of background image.

      var weatherIcon = myObj.weather[2].icon; // myObj.weather[2].icon will give the icon numbering to use.

      body.style.backgroundImage =
        "url(http://openweathermap.org/img/w/" + weatherIcon + ".png)";

      document.getElementById("temp").innerHTML =
        Math.round(myObj.main.temp) + degreeChar; // Displays the temperature rounded to the nearest degree.

      var windDeg;

      if (myObj.wind.deg === 0) {
        // This sections gives a text description of the direction from where the wind is originating.
        windDeg = "north";
      } else if (myObj.wind.deg > 0 && myObj.wind.deg < 90) {
        windDeg = "northeast";
      } else if (myObj.wind.deg === 90) {
        windDeg = "east";
      } else if (myObj.wind.deg > 90 && myObj.wind.deg < 180) {
        windDeg = "southeast";
      } else if (myObj.wind.deg === 180) {
        windDeg = "south";
      } else if (myObj.wind.deg > 180 && myObj.wind.deg < 270) {
        windDeg = "southwest";
      } else if (myObj.wind.deg === 270) {
        windDeg = "west";
      } else if (myObj.wind.deg > 270) {
        windDeg = "northwest";
      }

      document.getElementById("wind").innerHTML =
        "Wind is " + Math.round(myObj.wind.speed) + " " + speedType;
      document.getElementById("wind").innerHTML += " from the " + windDeg;
    }
  };

  xhttp.open(  // AJAX call to get data 
    "GET",
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=" +
      measurementType +
      "&type=accurate&mode=json&APPID=9efc90fc633f29c7de254fa237f1f1b5",
    true
  );
  xhttp.send();
}

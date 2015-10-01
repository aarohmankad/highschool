document.getElementById('weatherButton').addEventListener('click', function() {
  getWeatherData();
});

function getWeatherData() {
  // Create an HTTPRequest and our apiUrl
  var
    request = new XMLHttpRequest(),
    // URL contains our:
    // api_key: registed for one from Flickr website
    // forecast: what data we want
    // autoip: automatically get location data from computer
    apiUrl = 'http://api.wunderground.com/api/fa15555a27e3935d/forecast/q/autoip.json';

  // Open our request
  request.open('GET', apiUrl, true);

  // When request is loaded, execute this code
  request.onload = function() {
    // If statement checks there are no errors
    if (this.status >= 200 && this.status < 400) {
      // Success! Parse JSON
      var data = JSON.parse(this.response);
      // now format and load weather data into html
      formatAndLoadWeather(data);
    } else {
      // We reached our target server, but it returned an error
      console.log('We reached our target server, but it returned an error', this.error);
    }
  };

  // If there is an error with our request, print it here
  request.onerror = function(err) {
    // There was a connection error of some sort
    console.log('There was an error with wunderground', err.text);
  };

  // Send our request
  request.send();
};

function formatAndLoadWeather(data) {
  var weatherToday = data.forecast.txt_forecast.forecastday[0];

  var weatherImg = document.createElement('img');
  weatherImg.src = weatherToday.icon_url;

  var weatherText = document.createElement('p');
  weatherText.innerHTML = weatherToday.fcttext;

  document.getElementById('weather').appendChild(weatherImg);
  document.getElementById('weather').appendChild(weatherText);
}
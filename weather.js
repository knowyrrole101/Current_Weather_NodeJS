var request = require('request');

//built into Node.js

module.exports = function (city, callback) {
  return new Promise(function (resolve,reject){
      var encoded_city = encodeURIComponent(city);
      var url = 'http://api.openweathermap.org/data/2.5/weather?q='
      var api_key;
      if(!encoded_city){
        reject("Unable to fetch weather!");
      } else {
          request({
            url: url + encoded_city + api_key,
            json: true
           }, function(error, response, body){
              if (error){
                reject("Unable to fetch weather.");
              } else {
                //console.log(JSON.stringify(body, null, 4));
                resolve("The weather in "+ body.name + " is: " + Math.floor(body.main.temp) +"°F" );
              }
          });
      }
  })
};

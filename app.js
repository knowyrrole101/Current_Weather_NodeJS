var weather = require('./weather.js');
var location = require('./location.js');
var argv = require('yargs')
  .command('weather', "Get your weather!", function(yargs){
    yargs.options({
      city:{
        alias: 'c',
        demand: false,
        description: "City Name",
        type: 'string'
      }
    }).help('help');
  })
  .help('help')
  .argv;
console.log(argv);


if(typeof argv.c==='string' && argv.c.length > 0) {
  console.log('has location');
    // weather(argv.c, function (current_weather){
    //   console.log(current_weather);
    // });
      weather(argv.c).then(function (current_weather){
        console.log(current_weather);
      }).catch(function (error){
        console.log(error);
      });
} else {
  console.log("Location not provided...searching via IP location....")
  // location(function(location){
  //   if(location){
  //     weather(location.city, function(current_weather){
  //       console.log(current_weather);
  //     });
  //   } else{
  //     console.log("Unable to retrieve location!");
  //   }
  // });
    location().then(function (loc){
      return weather(loc.city);
    }).then(function (currentWeather){
        console.log(currentWeather);
    }).catch(function (error){
      console.log(error);
    })
};

(function(ext) {
    var enterWasPressed = false;

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.get_weather = function(zipcode, callback) {
      console.log("Getting current weather");
      // Make an AJAX call to the Open Weather Maps API
      $.ajax({
          url: 'http://api.openweathermap.org/data/2.5/weather?zip='+zipcode+'&appid=27f22360fce3c09eb4b3df095c988f3d',
          dataType: 'jsonp',
          success: function( weather_data ) {
            console.log(weather_data);
              // Got the data - parse it and return the temperature
              weather = weather_data['weather'][0]['main'];
              callback(weather);
          },
          failure: function(weather_data) {
            console.log(weather_data);
            weather = "Error";
            callback(weather);
          }
    });
  };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name

            ['R', 'current weather in zipcode %s', 'get_weather', '03063']
        ]
    };

    // Register the extension
    ScratchExtensions.register("Kaladin's weather extensions", descriptor, ext);

})({});

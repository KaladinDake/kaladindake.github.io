(function(ext) {
    var enterWasPressed = false;

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.get_temp = function(location, callback) {
      console.log("Getting current weather");
      // Make an AJAX call to the Open Weather Maps API
      $.ajax({
          url: 'http://samples.openweathermap.org/data/2.5/weather?zip=03063,us&appid=27f22360fce3c09eb4b3df095c988f3d',
          dataType: 'jsonp',
          success: function( weather_data ) {
            console.log("Got current weather");
              // Got the data - parse it and return the temperature
              temperature = weather_data['weather'][0]['main'];
              callback(temperature);
          }
    });
  };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name

            ['R', 'current temperature in city %s', 'get_temp', '03063']
        ]
    };

    // Register the extension
    ScratchExtensions.register("Kaladin's extensions", descriptor, ext);

})({});

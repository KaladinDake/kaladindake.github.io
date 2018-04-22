(function(ext) {
    var enterWasPressed = false;

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.im_playing = function(username, callback) {
      console.log("tell server i'm playing");
      // Make an AJAX call to the Open Weather Maps API

      try {
        $.ajax({
            url: 'https://cac477csf1.execute-api.us-east-1.amazonaws.com/stage/scratchMultiplayer?username='+username,
            dataType: 'jsonp',
            success: function( player_data ) {
              console.log(weather_data);
                // Got the data - parse it and return the temperature
                count = player_data['count'];
                callback(count);
            },
            error: function(player_data) {
              console.log(player_data);
              player_data = "Error";
              callback(player_data);
            }
          });
        } catch(err) {
          console.log(err);
          player_data = "Error";
          callback(player_data);
        }
  };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name

            ['R', 'how meny peaple are playing? Username: %s', 'im_playing', 'daker13']
        ]
    };

    // Register the extension
    ScratchExtensions.register("Kaladin's martiplayer extensions", descriptor, ext);

})({});

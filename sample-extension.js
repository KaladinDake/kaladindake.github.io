(function(ext) {
    var enterWasPressed = false;

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.sample_sync_command = function() {
        // Code that gets executed when the block is run
        console.log("Hi Kaladin");
    };

    ext.sample_async_command = function(callback) {
        // Functions for block with type 'w' will get a callback function as the
        // final argument. This should be called to indicate that the block can
        // stop waiting.
        console.log("Hi Kaladin");
        callback();
    };

    ext.sample_sync_reporter = function() {
        //Blocks can also return values, and they are called reporter blocks.
        console.log("Hi Kaladin");
        return 5;
    };

    ext.sample_async_reporter = function(callback) {
        //One common use-case for reporter blocks is getting data from
        //online web-services, where the blocks need to wait for the
        //web-api call to complete.
        console.log("Hi Kaladin");
        callback(50);
    };

    ext.sample_hat_block = function() {
        //Hat blocks go on top of block stacks -
        //examples of Scratch hat blocks include "when green flag clicked"
        //or "when this sprite clicked".
        //synchronous, returns Boolean, true = run stack
        console.log("Hi Kaladin");
        return true;
    };

    ext.enter_pressed = function() {
      if(enterWasPressed) {
        enterWasPressed = false;
        return true;
      }
      else {
        return false;
      }
    }

    ext.sample_boolean_reporter = function() {
        //Boolean reporter (like 'r' but returns only true or false)
        console.log("Hi Kaladin");
        return false;
    };

    ext.sample_arg_command = function(arg) {
        //arguments are always the first things passed to the function
        console.log("Hi Kaladin - argument is " + arg);
    };

    ext.get_temp = function(location, callback) {
      // Make an AJAX call to the Open Weather Maps API
      $.ajax({
          url: 'http://samples.openweathermap.org/data/2.5/weather?zip=03063,us&appid=27f22360fce3c09eb4b3df095c988f3d',
          dataType: 'jsonp',
          success: function( weather_data ) {
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
            [' ', 'sample sync command', 'sample_sync_command'],
            ['w', 'sample async command', 'sample_async_command'],
            ['r', 'sample sync reporter', 'sample_sync_reporter'],
            ['R', 'sample async reporter', 'sample_async_reporter'],
            ['h', 'sample hat block', 'sample_hat_block'],
            ['b', 'sample boolean reporter', 'sample_boolean_reporter'],
            [' ', 'sample command that takes argument with value %n', 'sample_arg_command', '2'],
            ['h', 'when enter key pressed', 'enter_pressed']
        ]
    };

    // Register the extension
    ScratchExtensions.register("Kaladin's extensions", descriptor, ext);

    $(document).keydown(function(event){
      console.log("Key down: " + event.which);
      if(event.which === 13) {
        console.log("Enter was pressed down");
        enterWasPressed = true;
      }
      else {
        console.log("Something other than enter was pressed");
        enterWasPressed = false;
      }
    });

})({});

const getCurrentWeather = require("./triggers/current_weather");
module.exports = {
  // This is just shorthand to reference the installed dependencies you have.
  // Zapier will need to know these before we can upload.
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: require('./authentication'),

  // If you want your trigger to show up, you better include it here!
  triggers: {
    [getCurrentWeather.key]: getCurrentWeather
  },

  // If you want your searches to show up, you better include it here!
  searches: {},

  // If you want your creates to show up, you better include it here!
  creates: {},

  resources: {},
};

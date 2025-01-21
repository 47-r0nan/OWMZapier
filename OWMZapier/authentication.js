module.exports = {
    type: 'custom', // Using custom authentication
    fields: [
      {
        key: 'apiKey',
        label: 'API Key',
        required: true,
        type: 'string',
        helpText: 'Enter your OpenWeatherMap API key here.',
      },
    ],
    test: async (z, bundle) => {
      const response = await z.request({
        url: 'https://api.openweathermap.org/data/2.5/weather',
        params: {
          q: 'London', // Example city to test the API key
          appid: bundle.authData.apiKey, // Use the user's API key
        },
      });
  
      if (response.status !== 200) {
        throw new Error('Invalid API Key. Please check your key and try again.');
      }
  
      // Return some user-friendly data for the test
      return response.json;
    },
  };
  
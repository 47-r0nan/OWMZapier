require('dotenv').config();
const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe('triggers.current_weather', () => {
  it('should run', async () => {
    const bundle = { 
      authData: {
        apiKey: process.env.OPENWEATHERMAP_API_KEY, // Use the environment variable
      },
      inputData: {
        city: 'Dublin', // Replace with a city name for testing
      } };

    const results = await appTester(App.triggers['current_weather'].operation.perform, bundle);
    expect(results).toBeDefined();
    // TODO: add more assertions
    expect(results.length).toBeGreaterThan(0); // Check that we get an array
    expect(results[0]).toHaveProperty('id'); // Ensure each item has an ID
    expect(results[0].name).toBe('Dublin'); // Validate city name
  });
});

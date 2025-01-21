// triggers on a new current_weather with a certain tag
const getWeather = async (z, bundle) => {
  const response = await z.request({
    url: 'https://api.openweathermap.org/data/2.5/weather',
    params: {
      q: bundle.inputData.city,
      appid: bundle.authData.apiKey,
    }
  });

  if (response.status !== 200) {
    throw new Error(`Failed to fetch weather data: ${response.status}`);
  }
  // this should return an array of objects
  // Convert response to an array and add an `id` property
  const data = response.json;
  return [
    {
      id: `${data.coord.lat},${data.coord.lon}`, // Unique ID for Zapier
      ...data, // Spread all original fields
    },
  ];
};

module.exports = {
  // see here for a full list of available properties:
  // https://github.com/zapier/zapier-platform/blob/main/packages/schema/docs/build/schema.md#triggerschema
  key: 'current_weather',
  noun: 'Current Weather',

  display: {
    label: 'Get Current Weather',
    description: 'Triggers when weather data for a specific city is fetched'
  },

  operation: {
    perform: getWeather,

    // `inputFields` defines the fields a user could provide
    // Zapier will pass them in as `bundle.inputData` later. They're optional.
    inputFields: [
      {
        key: 'city',
        label: 'City',
        required: true,
        type: 'string',
        helpText: 'Enter the name of the city for which to fetch weather data',
      },
    ],

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obvious placeholder values that we can show to any user.
    sample: {
      id: 1,
      name: 'Test'
    },

    // If fields are custom to each user (like spreadsheet columns), `outputFields` can create human labels
    // For a more complete example of using dynamic fields see
    // https://github.com/zapier/zapier-platform/tree/main/packages/cli#customdynamic-fields
    // Alternatively, a static field definition can be provided, to specify labels for the fields
    outputFields: [
      // these are placeholders to match the example `perform` above
      // {key: 'id', label: 'Person ID'},
      // {key: 'name', label: 'Person Name'}
    ]
  }
};

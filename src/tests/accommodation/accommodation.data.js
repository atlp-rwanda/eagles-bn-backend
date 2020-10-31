// eslint-disable-next-line import/prefer-default-export
export const accommodations = {
  valid: {
    name: 'Peponi Living Space',
    description: 'free wifi,gym, restaurant and many more',
    location_id: 1,
    lat: '41.03495273',
    long: '44.2346987',
    services: ['restaurant', 'breakfast', 'gym', 'swimming pool'],
    amenities: ['2 star hotel with swimming pool and gym', 'And yes we have the best cookies'],
  },
  invalid: {
    description: 'free wifi,gym, restaurant and many more',
    location_id: 1,
    lat: '41.03495273',
    long: '44.2346987',
    services: '["restaurant", "breakfast", "gym", "swimming pool"]',
    host_id: 1,
    amenities: '["2 stars hotel", "cooking"]',
  }
};

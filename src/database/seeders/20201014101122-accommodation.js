/* eslint-disable linebreak-style */
const up = (queryInterface) => queryInterface.bulkInsert('Accommodations', [
  {
    name: 'Peponi Living Space',
    description: 'free wifi,gym, restaurant and many more',
    location_id: 1,
    images: ['https://images.unsplash.com/photo-1560200353-ce0a76b1d438?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80', 'https://images.unsplash.com/photo-1560200353-ce0a76b1d438?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80'],
    lat: '41.03495273',
    lang: '44.2346987',
    services: ['restaurant', 'breakfast', 'gym', 'swimming pool'],
    host_id: 1,
    amenities: ['2 star hotel with swimming pool and gym', 'And yes we have the best cookies'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Serena Hotel',
    description: 'best customer services with free wifi, gym, restaurant and many more',
    location_id: 2,
    images: ['https://images.unsplash.com/photo-1559138803-bcdd7e9a2176?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80', 'https://images.unsplash.com/photo-1559138803-bcdd7e9a2176?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80'],
    lat: '41.03495273',
    lang: '44.2346987',
    services: ['restaurant', 'breakfast', 'gym', 'swimming pool'],
    host_id: 2,
    amenities: ['5 star hotel with swimming pool and gym', 'And yes we have the best cookies'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Galaxy Hotel',
    description: 'best customer services with free wifi, gym, restaurant and many more',
    location_id: 3,
    images: ['https://images.unsplash.com/photo-1576801582643-c4e3d33efd2e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80', 'https://images.unsplash.com/photo-1576801582643-c4e3d33efd2e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'],
    lat: '41.03495273',
    lang: '44.2346987',
    services: ['restaurant', 'breakfast', 'gym', 'swimming pool'],
    host_id: 3,
    amenities: ['5 star hotel with swimming pool and gym', 'And yes we have the best cookies'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'NewYork Hotel',
    description: 'best customer services with free wifi, gym, restaurant and many more',
    location_id: 4,
    images: ['https://images.unsplash.com/photo-1601780298271-b04074de49df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80', 'https://images.unsplash.com/photo-1601780298271-b04074de49df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80'],
    lat: '41.03495273',
    lang: '44.2346987',
    services: ['restaurant', 'breakfast', 'gym', 'swimming pool'],
    host_id: 4,
    amenities: ['5 star hotel with swimming pool and gym', 'And yes we have the best cookies'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'chicago Hotel',
    description: 'best customer services with free wifi, gym, restaurant and many more',
    location_id: 5,
    images: ['https://images.unsplash.com/photo-1548107121-ba49955415b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80', 'https://images.unsplash.com/photo-1548107121-ba49955415b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80'],
    lat: '41.03495273',
    lang: '44.2346987',
    services: ['restaurant', 'breakfast', 'gym', 'swimming pool'],
    host_id: 5,
    amenities: ['5 star hotel with swimming pool and gym', 'And yes we have the best cookies'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
]);

const down = (queryInterface) => queryInterface.bulkDelete('Accommodations', null, {});

export { up, down };

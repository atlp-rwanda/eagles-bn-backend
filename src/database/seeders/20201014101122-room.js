/* eslint-disable linebreak-style */

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Rooms', [
    {
      price: 5000,
      images: ['https://images.unsplash.com/photo-1598035411675-bda029a6bd29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80', 'https://images.unsplash.com/photo-1598035411675-bda029a6bd29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'],
      accommodation_id: 1,
      details: 'breakfast , cleaning and loundry,TV and internet are provided',
      available: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      price: 3000,
      images: ['https://images.unsplash.com/photo-1505773508401-e26ca9845131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=570&q=80', 'https://images.unsplash.com/photo-1505773508401-e26ca9845131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=570&q=80'],
      accommodation_id: 2,
      details: 'breakfast , cleaning and loundry,TV and internet are provided',
      available: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      price: 3000,
      images: ['https://images.unsplash.com/photo-1519449556851-5720b33024e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80', 'https://images.unsplash.com/photo-1519449556851-5720b33024e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80'],
      accommodation_id: 2,
      details: 'breakfast , cleaning and loundry,TV and internet are provided',
      available: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      price: 1000,
      images: ['https://images.unsplash.com/photo-1508253578933-20b529302151?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=915&q=80', 'https://images.unsplash.com/photo-1508253578933-20b529302151?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=915&q=80'],
      accommodation_id: 4,
      details: 'breakfast , cleaning and loundry,TV and internet are provided',
      available: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      price: 5000,
      images: ['https://images.unsplash.com/photo-1444201983204-c43cbd584d93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80', 'https://images.unsplash.com/photo-1444201983204-c43cbd584d93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'],
      accommodation_id: 5,
      details: 'breakfast , cleaning and loundry,TV and internet are provided',
      available: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Rooms', null, {})
};

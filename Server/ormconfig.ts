export default [
  {
    name: 'sqlite',
    type: 'sqljs',
    location: 'tmp/location.db',
    autoSave: true,
    keepConnectionAlive: true,
    entities: ['src/**/entities/*.ts'],
  },
];

import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'tmp/location.db',
  entities: ['dist/src/**/*.entity.js'],
  synchronize: true, // change to false when production migrations is in use

  // This is for production migrations
  // migrations: ['dist/src/db/migrations/*.js'],
  // cli: {
  //   migrationsDir: 'src/db/migrations',
  // },
};

export default config;

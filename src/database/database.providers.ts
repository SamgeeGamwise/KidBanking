import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'generic',
        password: 'Password1!',
        database: 'banking',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        // Turn off in prod
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
export const databaseConfig = {
    type: 'postgres' as const,
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres', // Replace with your actual password
    database: 'microservices_demo',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true, // Set to false in production
  };
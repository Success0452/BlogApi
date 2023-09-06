import sequelize from './index';

export async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database connection established and models synced.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


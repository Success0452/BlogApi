import { Sequelize } from 'sequelize';
import { Dialect } from 'sequelize/types';
import {DB_HOST, DB_PASSWORD, DB_NAME, DB_USERNAME, DB_PORT} from '../config/index';
import {Client}  from 'pg';

const dialect: Dialect = 'postgres';

const sequelize = new Sequelize({
  dialect,
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12345678',
  database: 'postgres',
});

export const client = new Client({
  host: DB_HOST,
  user: DB_USERNAME,
  port: 5432,
  password: DB_PASSWORD,
  database: DB_NAME
});

export default sequelize;

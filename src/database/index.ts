import { Sequelize } from 'sequelize';
import { Dialect } from 'sequelize/types';
import {DB_HOST, DB_PASSWORD, DB_NAME, DB_USER, DB_PORT} from '../config/index';
import {Client}  from 'pg';

const dialect: Dialect = 'postgres';

const sequelize = new Sequelize({
  dialect,
  host: DB_HOST,
  port: 5432,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

export const client = new Client({
  host: DB_HOST,
  user: DB_USER,
  port: 5432,
  password: DB_PASSWORD,
  database: DB_NAME
});

export default sequelize;

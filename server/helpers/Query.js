import db from '../models/db';

class Query {
  static async createUsersQuery(userInfo) {
    try {
      const result = await db.query(
        `INSERT INTO 
    users(firstname, lastname, othernames, email, 
          password, phone_number,
          is_admin, passport_url)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)
    returning id, firstname, lastname, othernames, email, phone_number, passport_url`,
        userInfo,
      );

      return result;
    } catch (error) {
      return error;
    }
  }

  static async checkUserInfoExist(userInfo) {
    try {
      const result = await db.query('SELECT email FROM users WHERE email = $1', userInfo);
      return result;
    } catch (err) {
      return err;
    }
  }

  static async getAll(table, column, userInfo) {
    try {
      const result = await db.query(`SELECT * FROM ${table} WHERE ${column} = $1`, userInfo);
      return result;
    } catch (error) {
      return undefined;
    }
  }
}

export default Query;

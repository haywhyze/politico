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

  static async checkDuplicate(table, field, value) {
    try {
      const result = await db.query(`SELECT ${field} FROM ${table} WHERE ${field} = $1`, value);
      return result;
    } catch (err) {
      return err;
    }
  }

  static async getAll(table, column, userInfo) {
    try {
      let result;
      if (column) result = await db.query(`SELECT * FROM ${table} WHERE ${column} = $1`, userInfo);
      else result = await db.query(`SELECT * FROM ${table}`);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async getOne(table, userInfo) {
    try {
      const result = await db.query(`SELECT * FROM ${table} WHERE id = $1`, userInfo);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async createParty(table, userInfo) {
    const text = `INSERT INTO ${table}(
        name,
        symbol,
        hq_address,
        logo_url
      )
      VALUES($1, $2, $3, $4)
      returning id, name`;
    try {
      const result = await db.query(text, userInfo);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default Query;

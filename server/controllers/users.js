import { hashPassword, generateToken, splitName } from '../helpers/index';
import Query from '../helpers/Query';

class UserController {
  static async create(req, res) {
    const name = splitName(res.locals.fullname);
    const hashedPassword = hashPassword(res.locals.password);
    const values = [
      name.firstName,
      name.lastName,
      name.otherNames,
      res.locals.email,
      hashedPassword,
      res.locals.phoneNumber,
      false,
      res.locals.image,
    ];

    const { rows } = await Query.createUsersQuery(values);
    if (rows) {
      const token = generateToken(rows[0].id);
      return res.status(201).send({
        status: 201,
        data: [
          {
            token,
            user: rows[0],
          },
        ],
      });
    }
    const error = await Query.createUsersQuery(values);
    console.log(error);
    return res.status(500).send({
      status: 500,
      error: 'Internal Server Error',
    });
  }
}

export default UserController;

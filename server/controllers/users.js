import { hashPassword, generateToken, comparePassword, splitName } from '../helpers/index';
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

  static async login(req, res) {
    const { rows } = await Query.getAll('users', 'email', [req.body.email]);
    if (!rows[0]) {
      return res.status(400).send({
        status: 400,
        error: 'Username/Password is incorrrect',
      });
    }
    if (!comparePassword(rows[0].password, req.body.password)) {
      return res.status(400).send({
        status: 400,
        error: 'Username/Password is incorrect',
      });
    }
    const token = generateToken(rows[0].id);
    return res.status(200).send({
      status: 200,
      data: [
        {
          token,
          user: rows[0],
        },
      ],
    });
  }
}

export default UserController;

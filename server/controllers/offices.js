import Query from '../helpers/Query';

class OfficeContrller {
  static async create(req, res) {
    const values = [req.body.type, res.locals.name];
    const { rows } = await Query.createOffice('offices', values);
    if (rows) {
      return res.status(201).send({
        status: 201,
        data: [
          {
            id: rows[0].id,
            type: rows[0].type,
            name: rows[0].name,
          },
        ],
      });
    }
    return res.status(500).send({
      status: 500,
      error: 'Internal server Error',
    });
  }
}

export default OfficeContrller;

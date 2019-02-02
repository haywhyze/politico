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

  static async getAll(req, res) {
    const { rows } = await Query.getAll(`offices`);
    return res.status(200).send({
      status: 200,
      data: [rows],
    });
  }

  static async getOne(req, res) {
    const id = Number(req.params.id);
    const { rows } = await Query.getOne(`offices`, [id]);

    return res.status(200).send({
      status: 200,
      data: [rows],
    });
  }
}

export default OfficeContrller;

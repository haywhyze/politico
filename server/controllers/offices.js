import Query from '../helpers/Query';
import { getAll, getOne } from '../helpers';

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
    getAll(req, res, 'offices');
  }

  static async getOne(req, res) {
    getOne(req, res, 'offices');
  }

  static async register(req, res) {
    const id = Number(req.params.id);
    const result = await Query.register([req.body.office, req.body.party, id, 'pending']);
    return res.status(201).send({
      status: 201,
      data: [result.rows],
    });
  }

  static async updateStatus(req, res) {
    const id = Number(req.params.id);
    const result = await Query.updateField('candidates', 'status', [req.body.status, id]);
    return res.status(200).send({
      status: 200,
      data: result,
    });
  }

  static async results(req, res) {
    const id = Number(req.params.id);
    const result = await Query.fetchResults('votes', [id]);
    if (result.rows) {
      return res.status(200).json({
        status: 200,
        data: result.rows,
      });
    }
    return res.status(500).send({
      status: 500,
      message: 'Internal Server Error',
    });
  }
}

export default OfficeContrller;

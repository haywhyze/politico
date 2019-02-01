import { getSymbol } from '../helpers';
import Query from '../helpers/Query';

class PartyController {
  static async create(req, res) {
    const values = [res.locals.partyName, res.locals.symbol, res.locals.address, res.locals.image];
    const { rows } = await Query.createParty('parties', values);
    if (rows) {
      return res.status(201).send({
        status: 201,
        data: [
          {
            id: rows[0].id,
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
    const { rows } = await Query.getAll(`parties`);
    return res.status(200).send({
      status: 200,
      data: [rows],
    });
  }

  static async getOne(req, res) {
    const id = Number(req.params.id);
    const { rows } = await Query.getOne(`parties`, [id]);

    return res.status(200).send({
      status: 200,
      data: [rows],
    });
  }

  static async updateName(req, res) {
    const id = Number(req.params.id);
    const partySymbol = getSymbol(res.locals.partyName);
    const result = await Query.updateField('parties', 'name', [res.locals.partyName, id]);
    const rows = await Query.updateField('parties', 'symbol', [partySymbol, id]);
    return res.status(200).send({
      status: 200,
      data: [
        {
          id: result[0].id,
          name: result[0].name,
          symbol: rows[0].symbol,
        },
      ],
    });
  }

  static async delete(req, res) {
    const id = Number(req.params.id);
    const { rows } = await Query.delete('parties', [id]);
    if (rows[0]) {
      return res.status(200).send({
        status: 200,
        data: [
          {
            id: rows[0].id,
            message: `Party has been deleted`,
          },
        ],
      });
    }
    return res.status(500).send({
      status: 500,
      error: 'Internal Server Error',
    });
  }
}

export default PartyController;

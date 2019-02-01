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
}

export default PartyController;

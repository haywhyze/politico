import Query from '../helpers/Query';

class VoteController {
  static async vote(req, res) {
    const values = [new Date(), res.locals.user.id, req.body.office, req.body.candidate];
    const result = await Query.vote(values);
    if (result.rows) {
      return res.status(201).send({
        status: 201,
        data: [
          {
            office: result.rows[0].office,
            candidate: result.rows[0].candidate,
            voter: result.rows[0].created_by,
          },
        ],
      });
    }
    if (result.constraint.includes('pkey')) {
      const error = 'You have already voted for this candidate';
      return res.status(409).send({
        status: 409,
        error,
      });
    }
    return res.status(500).send({
      status: 500,
      error: 'Internal Server Error',
    });
  }
}

export default VoteController;

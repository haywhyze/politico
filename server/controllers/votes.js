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
    let error;
    if (result.constraint.includes('pkey')) {
      error = 'You have already voted for a candidate for this office';
      return res.status(409).send({
        status: 409,
        error,
      });
    }
    if (result.constraint.includes('candidate')) error = 'Candidate ID does not exist.';
    if (result.constraint.includes('office')) error = 'Office ID does not exist.';
    return res.status(404).send({
      status: 404,
      error,
    });
  }

  static async getAllByUser(req, res) {
    const id = Number(req.params.id);
    const result = await Query.getVotesByUser([id]);
    if (result.rowCount !== 0) {
      return res.status(200).send({
        status: 200,
        data: result.rows,
      });
    }
    return res.status(500).send({
      status: 500,
      error: result.error,
    });
  }
}

export default VoteController;

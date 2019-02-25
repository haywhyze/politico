import Query from '../helpers/Query';

class CandidateController {
  static async getAll(req, res) {
    const result = await Query.getPendingCandidates();
    return res.status(200).send({
      status: 200,
      data: [result.rows],
    });
  }
}

export default CandidateController;

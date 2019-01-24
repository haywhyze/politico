import partiesData from '../models/parties';

class PartyController {
  static create(req, res) {
    const party = {
      id: partiesData.length + 1,
      name: req.body.name,
      hqAddress: req.body.hqAddress,
      logoUrl: req.body.logoUrl,
    };

    partiesData.push(party);
    return res.status(201).send({
      status: 201,
      data: [
        {
          id: party.id,
          name: party.name,
        },
      ],
    });
  }
}

export default PartyController;

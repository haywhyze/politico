import partiesData from '../models/parties';

class PartyController {
  static create(req, res) {
    const party = {
      id: partiesData.length + 1,
      name: req.body.name,
      hqAddress: res.locals.address,
      logoUrl: res.locals.logo,
    };
    partiesData.push(party);
    return res.status(201).send({
      status: 201,
      data: [
        {
          id: party.id,
          name: party.name,
          logoUrl: party.logoUrl,
          hqAddress: party.hqAddress,
        },
      ],
    });
  }
}

export default PartyController;

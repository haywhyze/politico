import partiesData from '../models/parties';

class PartyController {
  static create(req, res) {
    const party = {
      id: partiesData.length + 1,
      name: res.locals.partyName,
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

  static getAll(req, res) {
    return res.status(200).send({
      status: 200,
      data: partiesData,
    });
  }
}

export default PartyController;

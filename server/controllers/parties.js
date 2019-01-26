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

  static getOne(req, res) {
    const id = Number(req.params.id);
    const party = partiesData.find(e => e.id === id);
    return res.status(200).send({
      status: 200,
      data: [party],
    });
  }

  static patchName(req, res) {
    const id = Number(req.params.id);
    const partyIndex = partiesData.findIndex(party => party.id === id);
    partiesData[partyIndex].name = req.body.name;
    return res.status(200).send({
      status: 200,
      data: [
        {
          id,
          name: partiesData[partyIndex].name,
        },
      ],
    });
  }

  static delete(req, res) {
    const id = Number(req.params.id);
    const partyIndex = partiesData.findIndex(party => party.id === id);
    const party = partiesData.splice(partyIndex, 1);
    return res.status(200).send({
      status: 200,
      data: [
        {
          message: `${party[0].name} deleted`,
        },
      ],
    });
  }
}

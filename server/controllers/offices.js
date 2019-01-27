import officesData from '../models/offices';

class OfficeContrller {
  static create(req, res) {
    const office = {
      id: officesData.length + 1,
      type: req.body.type,
      name: res.locals.name,
    };
    officesData.push(office);
    return res.status(201).send({
      status: 201,
      data: [
        {
          id: office.id,
          type: office.type,
          name: office.name,
        },
      ],
    });
  }

  static getAll(req, res) {
    return res.status(200).send({
      status: 200,
      data: officesData,
    });
  }
}

export default OfficeContrller;

const Rest = require("./../models/Restaurant.model");

exports.register = (req, res) => {
  Rest.create(req.body, (err, result) => {
    if (err) {
      res.status(400).send({ message: err.message });
    }
    res.status(201).send(result);
  });
};

exports.findAll = (req, res) => {
  Rest.findAll(req, (err, result) => {
    if (err) {
      res.status(400).send({ message: err.message });
    }
    res.status(200).send(result);
  });
};
exports.findAllShort = (req, res) => {
  Rest.findAllShort(req, (err, result) => {
    if (err) {
      res.status(400).send({ message: err.message });
    }
    res.status(200).send(result);
  });
};

exports.findByName = (req, res) => {
  Rest.findByName(req.params.name, (err, result) => {
    if (err) {
      res.status(400).send({ message: err.message });
    }
    res.status(200).send(result);
  });
};
exports.update = (req, res) => {
  console.log("--", req.body);
  Rest.update(req.body, (err, result) => {
    if (err) {
      res.status(400).send({ message: err.message });
    }
    res.status(200).send(result);
  });
};

exports.delete = (req, res) => {
  const obj = {
    id: req.params.id,
    ...req.body,
  };
  Rest.statusChange(obj, (err, result) => {
    if (err) {
      res.status(400).send({ message: err.message });
    }
    res.status(200).send(result);
  });
};

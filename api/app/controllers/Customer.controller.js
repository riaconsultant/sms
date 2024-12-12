const Customer = require("./../models/Customer.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

  Customer.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while creation",
      });
    } else {
      res.status(201).send(data);
    }
  });
};

exports.findAll = (req, res) => {
  Customer.findAll(req, (err, result) => {
    if (err) {
      res.status(400).send({ message: err.message });
    }
    res.status(200).send(result);
  });
};

exports.findByMobile = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Customer input is empty!" });
  }
  Customer.findbymobile(req.params.mobile, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while creation",
      });
    } else {
      if (data.length) {
        res.status(200).send(data[0]);
      } else {
        res.status(400).send({ message: "Mobile does not exits !" });
      }
    }
  });
};

exports.update = (req, res) => {
  Customer.update(req.body, (err, result) => {
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
  Customer.update(obj, (err, result) => {
    if (err) {
      res.status(400).send({ message: err.message });
    }
    res.status(200).send(result);
  });
};

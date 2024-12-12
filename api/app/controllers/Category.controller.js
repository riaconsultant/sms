const Category = require("./../models/Menu.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

  Category.create(req.body, (err, data) => {
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
  console.log("req", req.params);
  Category.findAll(req.params, (err, result) => {
    if (err) {
      res.status(400).send({ message: err.message });
    }
    res.status(200).send(result);
  });
};

exports.findByRest = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Category input is empty!" });
  }
  Category.findByRest(req.params.id, (err, data) => {
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
  Category.update(req.body, (err, result) => {
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
  Category.update(obj, (err, result) => {
    if (err) {
      res.status(400).send({ message: err.message });
    }
    res.status(200).send(result);
  });
};

const User = require("./../models/User.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

  User.create(req.body, (err, data) => {
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
  User.findAll(req, (err, result) => {
    if (err) {
      res.status(400).send({ message: err.message });
    }
    res.status(200).send(result);
  });
};

exports.login = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

  User.login(req.body, (err, data) => {
    console.log("Auth 1", data);
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while creation",
      });
    } else {
      if (data.length == 1) {
        console.log("Auth", data);
        res.status(200).send(data[0]);
      } else {
        res.status(401).send({ message: "Unauthorized User" });
      }
    }
  });
};

exports.forgotpassword = (req, res) => {
  if (req) {
    res
      .status(200)
      .send({ message: "Mail send successfully, Please check mailbox." });
  } else {
    res.status(400).send({ message: "Mobile does not exits !" });
  }
};

exports.findByMobile = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "User input is empty!" });
  }
  User.findbymobile(req.params.mobile, (err, data) => {
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
  User.update(req.body, (err, result) => {
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
  User.statusChange(obj, (err, result) => {
    if (err) {
      res.status(400).send({ message: err.message });
    }
    res.status(200).send(result);
  });
};
exports.getRoles = (req, res) => {
  User.getRoles(req, (err, result) => {
    if (err) {
      res.status(400).send({ message: err.message });
    }
    res.status(200).send(result);
  });
};
exports.roleUpdate = (req, res) => {
  User.roleUpdate(req.body, (err, result) => {
    if (err) {
      res.status(400).send({ message: err.message });
    }
    res.status(200).send(result);
  });
};

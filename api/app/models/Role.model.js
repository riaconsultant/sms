const sql = require("./../../config/dbconn");

const Role = () => {};

Role.create = (obj, result) => {
  const query = ``;
  console.log("Obj", obj, query);
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    console.log("Logged In: ", res);
    result(null, res);
  });
};

Role.findAll = (obj, result) => {
  const query = ``;
  console.log("Obj", obj, query);
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    console.log("Logged In: ", res);
    result(null, res);
  });
};

Role.findById = (obj, result) => {
  const query = ``;
  console.log("Obj", obj, query);
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    console.log("Logged In: ", res);
    result(null, res);
  });
};

Role.delete = (obj, result) => {
  const query = ``;
  console.log("Obj", obj, query);
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    console.log("Logged In: ", res);
    result(null, res);
  });
};

module.exports = Role;

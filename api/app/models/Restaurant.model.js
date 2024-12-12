const sql = require("./../../config/dbconn");

const Restaurant = () => {};

Restaurant.create = (obj, result) => {
  const query = `INSERT INTO rests SET ?`;
  sql.query(query, obj, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...obj });
  });
};
Restaurant.findByName = (name, result) => {
  const query = `SELECT * FROM rests WHERE title LIKE '%${name}%'`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
Restaurant.findAll = (obj, result) => {
  const query = `select * from rests`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
Restaurant.findAllShort = (obj, result) => {
  const query = `select id,title,address from rests`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
Restaurant.update = (obj, result) => {
  const query = `update rests set ? where id=${obj.id}`;
  sql.query(query, obj, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    const { affectedRows } = res;
    res = {
      affectedRows,
      message: "Record updated Successfully",
    };
    result(null, res);
  });
};
Restaurant.statusChange = (obj, result) => {
  const query = `update rests set status=${obj.status} where id=${obj.id}`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    const { affectedRows } = res;
    res = {
      affectedRows,
      message: "Record updated Successfully",
    };
    result(null, res);
  });
};

module.exports = Restaurant;

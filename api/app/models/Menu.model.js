const sql = require("../../config/dbconn");

const Menu = () => {};

Menu.create = (obj, result) => {
  const query = `insert into categories set ? `;
  sql.query(query, obj, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...obj });
  });
};

// Menu.findByName = (obj, result) => {
//   const query = ``;
//   sql.query(query, (err, res) => {
//     if (err) {
//       console.log("error", err);
//       result(err, null);
//       return;
//     }
//     result(null, res);
//   });
// };
Menu.findByRest = (id, result) => {
  const query = `SELECT * FROM categories WHERE rests_id=${id} AND STATUS !=1`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
Menu.findAll = (obj, result) => {
  const query = `SELECT * FROM categories WHERE STATUS !=1 order by rests_id asc`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
Menu.update = (obj, result) => {
  const query = `update categories set ? where id=${obj.id}`;
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

module.exports = Menu;

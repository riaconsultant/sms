const sql = require("./../../config/dbconn");

const Order = () => {};

Order.create = (obj, result) => {
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
Order.addCustomer = (obj, result) => {
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
Order.additem = (obj, result) => {
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
Order.removeItem = (obj, result) => {
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

module.exports = Order;

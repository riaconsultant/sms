const sql = require("./../../config/dbconn");
const Customer = (customer) => {
  this.mobile = customer.mobile;
  this.name = customer.name;
  this.email = customer.email;
};

Customer.findAll = (obj, result) => {
  const query = `select * from customers`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Customer.findbymobile = async (mobile, result) => {
  await sql.query(
    `select * from customers where mobile="${mobile}"`,
    (err, res) => {
      if (err) {
        result(err, null);
      }
      result(null, res);
    }
  );
};

Customer.update = (obj, result) => {
  const query = `update customers set ? where id=${obj.id}`;
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

Customer.create = (newCustomer, result) => {
  Customer.findbymobile(newCustomer.mobile, (err, res) => {
    if (res.length) {
      result({ message: "Mobile already exits" }, null);
    } else {
      sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        result(null, newCustomer);
      });
    }
  });
};

module.exports = Customer;

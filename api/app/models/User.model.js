const bcrypt = require("bcrypt");
const sql = require("./../../config/dbconn");
const jwt = require("jsonwebtoken");
const User = (user) => {
  this.mobile = user.mobile;
  this.name = user.name;
  this.password = user.password;
  this.role_id = user.role_id;
  this.restaurant_id = user.restaurant_id;
};
const TOKEN_KEY = "12345678";

User.findAll = (obj, result) => {
  const query = `select * from users`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

User.findbymobile = async (mobile, result) => {
  await sql.query(
    `select * from users where mobile="${mobile}"`,
    (err, res) => {
      if (err) {
        result(err, null);
      }
      if (res.length) {
        res[0].password = undefined;
      }
      result(null, res);
    }
  );
};
User.update = (obj, result) => {
  const query = `update users set ? where id=${obj.id}`;
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

User.create = async (newUser, result) => {
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);
  User.findbymobile(newUser.mobile, (err, res) => {
    if (res.length) {
      result({ message: "Mobile already exits" }, null);
    } else {
      sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        // console.log("User Created", { id: res.insertId, ...newUser });
        newUser.password = undefined;
        result(null, { id: res.insertId, ...newUser });
      });
    }
  });
};

User.login = async (obj, result) => {
  const query = `SELECT users.id, mobile, name, password ,restaurant_id,role, rests.title,rests.address,rests.district,rests.state,rests.lic_no,rests.rating,rests.location from users inner join roles on roles.id=users.roles_id INNER JOIN rests ON rests.id= users.restaurant_id where mobile="${obj.mobile}" and users.status !=1`;
  sql.query(query, async (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      const validPwd = await bcrypt.compare(obj.pwd, res[0].password);
      if (validPwd) {
        res[0].password = undefined;
        res[0].token = User.createJWT(res[0]);
        result(null, res);
      } else {
        result({ message: "Invalid Password !" }, null);
      }
    } else {
      result({ message: "Invalid UserId and Password !" }, null);
    }
  });
};
User.createJWT = (obj) => {
  const token = jwt.sign({ user_id: obj.id, mobile: obj.mobile }, TOKEN_KEY, {
    expiresIn: "6h",
  });
  return token;
};
User.statusChange = (obj, result) => {
  const query = `update users set status=${obj.status} where id=${obj.id}`;
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

User.getRoles = (obj, result) => {
  const query = `SELECT id,ROLE FROM roles WHERE STATUS !=1;`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

User.roleUpdate = (obj, result) => {
  const query = `update roles set ? where id=${obj.id}`;
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

module.exports = User;

var app = require("express")();
var bodyparser = require("body-parser");
const userCtrl = require("./app/controllers/User.controller");
const apiRoute = require("./app/route/apiroute");
var compression = require("compression");
var helmet = require("helmet");
var xssFilter = require("xss-filters");
var lusca = require("lusca");
const passport = require("passport");
const authenticate = require("./app/authentication");
// const https = require('https');
const fs = require("fs");
var corsOptions = {
  origin: ["https://www.manojchaurasiya.com", "http://localhost:3000"],
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));
const cors = require("cors");
// let options= {
//     key: fs.readFileSync('./i-service-key.pem'),
//     cert: fs.readFileSync('./i-service-cert.pem')
// };

app.use(passport.initialize());
app.use(passport.session());

app.use(compression());
app.use(helmet());

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(
  lusca.csp({
    policy: {
      "default-src": "'self'",
      "style-src": "'self'",
      "img-src": "'self'",
      "frame-ancestors": "'none'",
    },
  })
);

app.use(lusca.xframe("DENY"));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization"
  );
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({ status: "App is running" });
});

app.use("/api", apiRoute);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});

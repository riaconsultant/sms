const router = require("express").Router();
const jwt = require("jsonwebtoken");
const userController = require("./../controllers/User.controller");

// Login and forget password API
/**
 * @swagger
 * /health:
 *   get:
 *     summary: Test System is connected
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: ""
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */
router.get("/health", (req, res) => {
  res.status(200).json({ message: "System is Connected" });
});
/**
 * @swagger
 * /authenticate:
 *   post:
 *     summary: Authenticate a user
 *     tags: [Users]
 *     requestBody:
 *       description: Student object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobile:
 *                 type: string
 *               pwd:
 *                 type: string
 *             example:
 *                mobile: "9632444226"
 *                pwd: "12345"
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: {}
 *       400:
 *         description: Invalid request
 */
// login
router.post("/authenticate", userController.login);
/**
 * @swagger
 * /forgotpassword:
 *   post:
 *     summary: send mail to register user
 *     tags: [Users]
 *     parameters:
 *       - name: mobile
 *         in: path
 *         required: true
 *         description: The mobile of the User
 *         schema:
 *           type: string
 *         example:
 *             9632444226
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       404:
 *         description: User not found
 */
// forgot
router.post("/forgotpassword", userController.forgotpassword);
/**
 * @swagger
 * /mobile/{mobile}:
 *   post:
 *     summary: Get a User by mobile number
 *     tags: [Users]
 *     parameters:
 *       - name: mobile
 *         in: path
 *         required: true
 *         description: The mobile of the User
 *         schema:
 *           type: string
 *         example:
 *             9632444226
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       404:
 *         description: User not found
 */
// verify mobile
router.get("/mobile/:mobile", userController.findByMobile);

// register
// router.post("/register", userController.create);

router.post("/verify", (req, res) => {
  const val = jwt.verify(req.body.token, "123456");
  res.status(200).json({ val: val });
});

module.exports = router;

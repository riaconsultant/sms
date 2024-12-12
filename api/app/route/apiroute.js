const router = require("express").Router();

const hello = { text: "hello World" };
/** Controllers */
const userCtrl = require("../controllers/User.controller");
const customerCtrl = require("../controllers/Customer.controller");
const restCtrl = require("../controllers/Restaurant.controller");
const menuCtrl = require("../controllers/Category.controller");
const orderCtrl = require("../controllers/Order.controller");

router.get("/hello", (req, res) => {
  res.status(200).json(hello);
});

router.get("/user", userCtrl.findAll);
router.get("/user/:mobile", userCtrl.findByMobile);
router.post("/user", userCtrl.create);
/**
 * @swagger
 * /api/user:
 *   put:
 *     summary: Update a User by mobile
 *     description: Update the details of a User by providing the mobile.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the student to be updated.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated student information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               gender:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful update
 *         content:
 *           application/json:
 *             example:
 *               message: 'User updated successfully'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'User not found'
 */
router.put("/user/:id", userCtrl.update);
/**
 * @swagger
 * /student/{id}:
 *   delete:
 *     summary: Delete a user by unique id
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The mobile of the user
 *         schema:
 *           type: integer
 *         example:
 *             9632444226
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
//delete user
router.delete("/user/:id", userCtrl.delete);

router.get("/customer", customerCtrl.findAll);
router.get("/customer/:mobile", customerCtrl.findByMobile);
router.post("/customer", customerCtrl.create);
router.put("/customer", customerCtrl.update);
router.delete("/customer/:id", customerCtrl.delete);

router.get("/role", userCtrl.getRoles);
router.post("/role", userCtrl.roleUpdate);

router.post("/restaurant", restCtrl.register);
/**
 * @swagger
 * /restaurant:
 *   get:
 *     summary: Get a list of all restaurant
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */
//Get All Restaurant
router.get("/restaurant", restCtrl.findAll);
/**
 * @swagger
 * /restaurants/{shortname}:
 *   get:
 *     summary: Get a Restaurant by short name
 *     tags: [Restaurants]
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         description: The name of the Restaurant
 *         schema:
 *           type: string
 *         example:
 *             sun
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       404:
 *         description: Restaurant not found
 */
router.get("/restaurant/short", restCtrl.findAllShort);
/**
 * @swagger
 * /restaurants/{name}:
 *   get:
 *     summary: Get a Restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         description: The name of the Restaurant
 *         schema:
 *           type: string
 *         example:
 *             sun
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       404:
 *         description: Restaurant not found
 */
// get by name
router.get("/restaurant/:name", restCtrl.findByName);
router.put("/restaurant", restCtrl.update);
router.delete("/restaurant/:id", restCtrl.delete);

router.get("/menu", menuCtrl.findAll);
router.get("/menu/:id", menuCtrl.findByRest);
router.post("/menu", menuCtrl.create);
router.put("/menu", menuCtrl.update);
router.delete("/menu/:id", menuCtrl.delete);

router.get("/", (req, res) => {
  let routeData = [];
  router.stack.forEach((element) => {
    let obj = {};
    if (element.route) {
      obj.path = element.route.path;
      obj.method = element.route.stack[0].method;
    }
    routeData.push(obj);
  });
  //routeData.push(router.stack);
  res.status(200).json(router.stack);
});
module.exports = router;

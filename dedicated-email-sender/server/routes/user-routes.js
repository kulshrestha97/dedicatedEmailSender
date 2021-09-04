const router = require("express").Router();

const userController = require("../controllers/user-controller");

router.get("/login", userController.login);
router.post("/signup", userController.signup);
router.get("/:id", userController.getUserProfile);
module.exports = router;

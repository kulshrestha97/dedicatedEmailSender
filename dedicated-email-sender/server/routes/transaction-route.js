const router = require("express").Router();
const transactionController = require("../controllers/transaction-controller");

router.get("/getAll", transactionController.getAll);
router.get("/getByDate", transactionController.getByDate);
router.get("/getBySubject", transactionController.getBySubject);
router.post("/sendEmail", transactionController.sendEmail);

module.exports = router;

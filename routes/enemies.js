const router = require("express").Router();
const enemyController = require("../controllers/enemies");

router.get("/", enemyController.getAll);
router.get("/:id", enemyController.getSingle);
router.post("/", enemyController.createEnemy);
module.exports = router;
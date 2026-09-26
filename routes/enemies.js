const router = require("express").Router();
const enemyController = require("../controllers/enemies");

router.get("/", enemyController.getAll);
router.get("/:id", enemyController.getSingle);
router.post("/", enemyController.createEnemy);
router.put("/:id", enemyController.updateEnemy);
router.delete("/:id", enemyController.deleteEnemy)
module.exports = router;
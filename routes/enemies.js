const router = require("express").Router();
const enemyController = require("../controllers/enemies");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", enemyController.getAll);
router.get("/:id", enemyController.getSingle);
router.post("/", isAuthenticated, enemyController.createEnemy);
router.put("/:id", isAuthenticated, enemyController.updateEnemy);
router.delete("/:id", isAuthenticated, enemyController.deleteEnemy);
module.exports = router;
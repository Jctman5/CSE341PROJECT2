const router = require("express").Router();
const playerController = require("../controllers/players");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", playerController.getAll);
router.get("/:id", playerController.getSingle);
router.post("/", isAuthenticated, playerController.createPlayer);
router.put("/:id", isAuthenticated, playerController.updatePlayer);
router.delete("/:id", isAuthenticated, playerController.deletePlayer);

module.exports = router;
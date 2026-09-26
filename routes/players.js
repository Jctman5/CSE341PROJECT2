const router = require("express").Router();
const playerController = require("../controllers/players");
router.get("/", playerController.getAll);
router.get("/:id", playerController.getSingle);
router.post("/", playerController.createPlayer);
router.put("/:id", playerController.updatePlayer);
router.delete("/:id", playerController.deletePlayer);
module.exports = router;
const router = require("express").Router();
const playerController = require("../controllers/players");
console.log(playerController);
router.get("/", playerController.getAll);
router.get("/:id", playerController.getSingle);
router.post("/", playerController.createPlayer);
module.exports = router;
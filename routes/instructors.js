const router = require("express").Router();
const getInstructorsController = require("../controllers/instructorsController");
const { isAuthenticated } = require("../middleware/authenticate");
router.get("/", getinstructorsController.getInstructors);
router.get("/:id", getInstructorsController.getInstructor);
router.post("/", isAuthenticated, getInstructorsController.createInstructor);
router.put("/:id", isAuthenticated, getInstructorsController.updateInstructor);
router.delete("/:id", isAuthenticated, getInstructorsController.deleteInstructor);
module.exports = router;
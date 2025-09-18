const router = require("express").Router();
const userService = require("../../services/user");

const { validate } = require("../../middlewares/validator");
const validationSchemas = require("../../middlewares/validationSchemas");
const { validateParams } = require("../../middlewares/paramsValidate");

router.post("/add", userService.create);

router.get("/get", userService.get);
router.get("/get/:id", userService.getOne)
router.patch("/update/:id", userService.update);
router.delete("/delete/:id", userService.del);

module.exports = router;

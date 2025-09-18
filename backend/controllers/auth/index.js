const router = require("express").Router();
const authService = require("../../services/auth");

const { validate } = require("../../middlewares/validator");
const validationSchemas = require("../../middlewares/validationSchemas");
const { validateParams } = require("../../middlewares/paramsValidate");

router.post("/login",  authService.login);
// router.get("/get", authService.get);
// router.get("/get/:id", authService.getOne);
// router.patch( "/update/:id",    authService.update);
// router.delete("/delete/:id", authService.del);

module.exports = router;

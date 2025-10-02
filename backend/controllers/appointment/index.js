const router = require("express").Router();
const appointmentService = require("../../services/appointment");

const { validate } = require("../../middlewares/validator");
const validationSchemas = require("../../middlewares/validationSchemas");
const { validateParams } = require("../../middlewares/paramsValidate");
const { upload } = require("../../utils/multer");


router.post("/add",    appointmentService.create);

router.get("/get", appointmentService.get);
router.get("/get/:id", appointmentService.getOne)
router.patch("/update/:id", appointmentService.update);
router.delete("/delete/:id", appointmentService.del);

module.exports = router;

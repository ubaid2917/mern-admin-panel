const router = require("express").Router();
const doctorService = require("../../services/doctor");

const { validate } = require("../../middlewares/validator");
const validationSchemas = require("../../middlewares/validationSchemas");
const { validateParams } = require("../../middlewares/paramsValidate");
const { upload } = require("../../utils/multer");


router.post("/add",    doctorService.create);

router.get("/get", doctorService.get);
router.get("/get/:id", doctorService.getOne)
router.patch("/update/:id", doctorService.update);
router.delete("/delete/:id", doctorService.del);

module.exports = router;

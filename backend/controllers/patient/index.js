const router = require("express").Router();
const patientService = require("../../services/patient");

const { validate } = require("../../middlewares/validator");
const validationSchemas = require("../../middlewares/validationSchemas");
const { validateParams } = require("../../middlewares/paramsValidate");
const { upload } = require("../../utils/multer");


router.post("/add", upload.single("file"),  patientService.create);

router.get("/get", patientService.get);
router.get("/get/:id", patientService.getOne)
router.patch("/update/:id", patientService.update);
router.delete("/delete/:id", patientService.del);

module.exports = router;

const router = require("express").Router();
const departmentService = require("../../services/department");

const { validate } = require("../../middlewares/validator");
const validationSchemas = require("../../middlewares/validationSchemas");
const { validateParams } = require("../../middlewares/paramsValidate");
const { upload } = require("../../utils/multer");


router.post("/add", upload.single("file"), validate(validationSchemas.patient),  departmentService.create);

router.get("/get", departmentService.get);
router.get("/get/:id", departmentService.getOne)
router.patch("/update/:id", departmentService.update);
router.delete("/delete/:id", departmentService.del);

module.exports = router;

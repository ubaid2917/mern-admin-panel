const router = require("express").Router();
const cardService = require("../../services/smartCard");

const { validate } = require("../../middlewares/validator");
const validationSchemas = require("../../middlewares/validationSchemas");
const { validateParams } = require("../../middlewares/paramsValidate");
const { upload } = require("../../utils/multer");


router.post("/add",    cardService.create);

router.get("/get", cardService.get);
router.get("/get/:id", cardService.getOne)
router.patch("/update/:id", cardService.update);
router.delete("/delete/:id", cardService.del);


router.post("/add", validate(validationSchemas.patient), cardService.create);
router.get("/get", cardService.get);
router.get("/get/:id", cardService.getOne)
router.patch("/update/:id", cardService.update);
router.delete("/delete/:id", cardService.del);

module.exports = router;

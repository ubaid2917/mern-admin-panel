const router = require("express").Router();
const chatService = require("../../services/chat");

const { validate } = require("../../middlewares/validator");
const validationSchemas = require("../../middlewares/validationSchemas");
const { validateParams } = require("../../middlewares/paramsValidate");
const { upload } = require("../../utils/multer");


router.post("/send-message",    chatService.create);

router.get("/get", chatService.get);
router.get("/get/:id", chatService.getOne)
router.patch("/update/:id", chatService.update);
router.delete("/delete/:id", chatService.del);

module.exports = router;

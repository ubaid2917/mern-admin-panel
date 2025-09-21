const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { TEXTS, STATUS_CODES } = require("../../config/constants");
const { Patient } = require("../../models");
const { success, error } = require("../../utils/response");
const { handleFileUpload } = require("../../utils/fileUpload");

const create = asyncErrorHandler(async (req, res) => {
  try {
    const { phone } = req.body;

    // Check phone already exist
    const isExistPhone = await Patient.findOne({ where: { phone } });
    if (isExistPhone) {
      return error(res, "Phone already exist");
    }

    // Upload file if exists
    if (req.file) {
      const uploaded = await handleFileUpload(req.file, "patient");

      if (!uploaded.success) {
        return error(res, uploaded.message);
      }

      req.body.pic = uploaded.fileUrl;
    }

    const data = await Patient.create(req.body);
    return success(res, TEXTS.CREATED, data, 201);
  } catch (err) {
    return error(res, "Failed to create patient", [err.message], 500);
  }
});


const seed = asyncErrorHandler(async (req, res) => {
  try {
     const users = [];

    for (let i = 0; i < 200; i++) {
      const hashedPassword = await bcrypt.hash("123456", 10); // default password for all

      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number("03#########"), // Pakistani style phone
        country: faker.location.country(),
        city: faker.location.city(),
        zip: faker.location.zipCode(),
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await User.bulkCreate(users);

    console.log("✅ 200 fake users inserted successfully!");
  } catch (err) {
    return error(res, "Failed to create user", [err.message], 500);
  }
})  


const update = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;

  const [status, updatedData] = await Patient.update(
    { ...req.body },
    {
      where: { id },
      returning: true,
    }
  );

  if (!status) {
    return error(res, "data not found");
  }

  return success(res, TEXTS.UPDATED, updatedData, 200);
});

const get = asyncErrorHandler(async (req, res) => {  

  const {search} = req.query;  

  let whereCondition = {};
   
  // just search on email
  if(search){
   whereCondition = {
     [Op.or] : [
      { name: { [Op.iLike]: `%${search}%` } },
      { email: { [Op.iLike]: `%${search}%` } },
      { phone: { [Op.iLike]: `%${search}%` } },
     ]

   }
     
   {email:search}
  }

  const { count, rows } = await Patient.findAndCountAll({
    order: [["created", "DESC"]],
    ...req.pagination, 
    where: whereCondition
  });

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: 200,
    message: TEXTS.FOUND,
    data: rows,
    count,
    limit: req.pagination.limit,
    page: req.pagination.offset / req.pagination.limit + 1,
    pageCount: Math.ceil(count / req.pagination.limit),
  });
});
const getOne = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const data = await Patient.findOne({
    where: { id },
  });

  return success(res, "Data Found", data, 200);
});

const del = asyncErrorHandler(async (req, res) => {
  const data = await Patient.findOne({
    where: { id: req.params?.id },
  });

  if (!data) {
    return error(res, TEXTS.NOT_FOUND);
  }

  await Patient.destroy({
    where: { id: req.params?.id },
  });

  return success(res, TEXTS.DELETED, null, 200);
});

module.exports = {
  create,
  update,
  get,
  getOne,
  del,
};

const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { TEXTS, STATUS_CODES } = require("../../config/constants");
const { Patient, User } = require("../../models");
const { success, error } = require("../../utils/response");
const { handleFileUpload } = require("../../utils/fileUpload"); 
const { faker } = require('@faker-js/faker');
const { Op } = require("sequelize"); 
const bcrypt = require("bcrypt");
const create = asyncErrorHandler(async (req, res) => {
  try {
    const { phone, email } = req.body;

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

    const hashedPassword = await bcrypt.hash("12345678", 10);

    await User.create({
      name: req.body?.name,
      email: req.body?.email,
      password: hashedPassword,
      role: "patient",
      phone: phone
    }) 

    return success(res, TEXTS.CREATED, data, 201);
  } catch (err) {
    return error(res, "Failed to create patient", [err.message], 500);
  }
});

const seed = async () => {
  try {
    const patients = [];

    for (let i = 0; i < 200; i++) {
      patients.push({
        name: faker.person.fullName(),
        fatherName: faker.person.firstName(), // no fatherName in faker.internet
        phone: faker.phone.number("03#########"),
        gender: faker.helpers.arrayElement(['male', 'female']),
        dob: faker.date.birthdate({ min: 18, max: 80, mode: 'age' }),
        bloodGroup: faker.helpers.arrayElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
        martialStatus: faker.helpers.arrayElement(['married', 'single']),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await Patient.bulkCreate(patients);
    console.log("✅ 200 fake patients inserted successfully!");
  } catch (err) {
    console.error("❌ Failed to create patients:", err.message);
  }
};
 

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

//  await seed()
          
  const {search} = req.query;  

  let whereCondition = {};
   
  // just search on email
  if(search){
   whereCondition = {
     [Op.or] : [
      { name: { [Op.iLike]: `%${search}%` } },
      { phone: { [Op.iLike]: `%${search}%` } },
     ]

   }
     
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

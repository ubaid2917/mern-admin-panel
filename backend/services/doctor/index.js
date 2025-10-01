const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { TEXTS, STATUS_CODES } = require("../../config/constants");
const { Doctor , Department} = require("../../models");
const { success, error } = require("../../utils/response");
const { faker } = require("@faker-js/faker");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { createZoomMeeting } = require("../../utils/zoomService");

const create = asyncErrorHandler(async (req, res) => {
  try {
    const { email, phone, isLive } = req.body;

    // Check Doctor already exist
    const isExist = await Doctor.findOne({ where: { email } });
    if (isExist) {
      return error(res, "Email already exist");
    }

    if (isExist?.phone === phone) {
      return error(res, "Phone already exist");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    req.body.password = hashedPassword;

    const data = await Doctor.create(req.body);
    return success(res, TEXTS.CREATED, data, 201);
  } catch (err) {
    return error(res, "Failed to create record", [err.message], 500);
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
        gender: faker.helpers.arrayElement(["male", "female"]),
        dob: faker.date.birthdate({ min: 18, max: 80, mode: "age" }),
        bloodGroup: faker.helpers.arrayElement([
          "A+",
          "A-",
          "B+",
          "B-",
          "AB+",
          "AB-",
          "O+",
          "O-",
        ]),
        martialStatus: faker.helpers.arrayElement(["married", "single"]),
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

  const [status, updatedData] = await Doctor.update(
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
  const { search } = req.query;

  let whereCondition = {};

  if (search) {
    whereCondition = {
      [Op.or]: [
        { name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
      ],
    };
  }
  const { count, rows } = await Doctor.findAndCountAll({
    attributes: {exclude: ['password', 'deleted', 'departmentId']},
    include: [
      {
        model: Department,
        as: "department",
        attributes: ["name"]
      }
    ],
    order: [["created", "DESC"]],
    ...req.pagination,
    where: whereCondition,
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
  const data = await Doctor.findOne({
    where: { id },
    attributes: {exclude: ['password', 'deleted', 'departmentId']},
    include: [
      {
        model: Department,
        as: "department",
        attributes: ["name"]
      }
    ],
  });

  return success(res, "Data Found", data, 200);
});

const del = asyncErrorHandler(async (req, res) => {
  const data = await Doctor.findOne({
    
    where: { id: req.params?.id },
  });

  if (!data) {
    return error(res, TEXTS.NOT_FOUND);
  }

  await Doctor.destroy({
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

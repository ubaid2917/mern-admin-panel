const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { TEXTS, STATUS_CODES } = require("../../config/constants");
const { SmartCard, Patient, PatientCard } = require("../../models");
const { success, error } = require("../../utils/response");
const { faker } = require("@faker-js/faker");
const { Op, where } = require("sequelize");
const { scheduleJob } = require("../../bullService/index");

const create = asyncErrorHandler(async (req, res) => {
  try {
    const { type } = req.body;

    // Check SmartCard already exist
    const isExistCard = await SmartCard.findOne({ where: { type } });
    if (isExistCard) {
      return error(res, "SmartCard already exist");
    }

    const data = await SmartCard.create(req.body);
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

  const [status, updatedData] = await SmartCard.update(
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

  const { search } = req.query;

  let whereCondition = {};

  if (search) {
    whereCondition = {
      [Op.or]: [{ name: { [Op.iLike]: `%${search}%` } }],
    };
  }

  const { count, rows } = await SmartCard.findAndCountAll({
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
  const data = await SmartCard.findOne({
    where: { id },
  });

  return success(res, "Data Found", data, 200);
});

const del = asyncErrorHandler(async (req, res) => {
  const data = await SmartCard.findOne({
    where: { id: req.params?.id },
  });

  if (!data) {
    return error(res, TEXTS.NOT_FOUND);
  }

  await SmartCard.destroy({
    where: { id: req.params?.id },
  });

  return success(res, TEXTS.DELETED, null, 200);
});

const assign = asyncErrorHandler(async (req, res) => {
  try {
    const { cardId, patientId } = req.body;

    // Check patient
    const isExistPatient = await Patient.findOne({ where: { id: patientId } });
    if (!isExistPatient) {
      return error(res, "Patient not found");
    }
    // Check card
    const isExistCard = await SmartCard.findOne({ where: { id: cardId } });
    if (!isExistPatient) {
      return error(res, "Card not found");
    }
    // Calculate expiry date based on card validity
    const currentDate = new Date();
    const validity = isExistCard.validity;
    const expiredAt = new Date(currentDate);
    expiredAt.setMonth(expiredAt.getMonth() + validity);

    // discount from card
    req.body.discount = isExistCard.discount;
    req.body.expiredAt = expiredAt;

    // Check if patient already has an active card
    const existingPatientCard = await PatientCard.findOne({
      where: {
        patientId,
        isExpired: false,
        expiredAt: {
          [Op.gt]: new Date(), 
        },
      },
    });

    if (existingPatientCard) {
      return error(res, "Patient already has an active card");
    }

    const data = await PatientCard.create(req.body);

    // schedule job
    scheduleJob(
      "card-expiry",
      { id: data.id },
      expiredAt.getTime() - Date.now()
    );

    return success(res, TEXTS.CREATED, data, 201);
  } catch (err) {
    return error(res, "Failed to create record", [err.message], 500);
  }
});

const assignList = asyncErrorHandler(async (req, res) => {
  const { search } = req.query;

  let whereCondition = {};

  if (search) {
    whereCondition = {
      [Op.or]: [{ name: { [Op.iLike]: `%${search}%` } }],
    };
  }

  const { count, rows } = await PatientCard.findAndCountAll({
    attributes: { exclude: ["deleted", "patientId", "cardId"] },
    include: [
      {
        model: Patient,
        as: "patient",
        attributes: ["id", "name", "phone"],
        where: whereCondition,
      },
      {
        model: SmartCard,
        as: "card",
        attributes: ["id", "name", "type"],
      },
    ],
    order: [["created", "DESC"]],
    ...req.pagination,
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

module.exports = {
  create,
  update,
  get,
  getOne,
  del,
  assign,
  assignList,
};

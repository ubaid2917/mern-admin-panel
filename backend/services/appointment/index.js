const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { TEXTS, STATUS_CODES } = require("../../config/constants");
const { Doctor, Patient, Appointment, Department } = require("../../models");
const { success, error } = require("../../utils/response");
const { faker } = require("@faker-js/faker");
const { Op } = require("sequelize");
const { createZoomMeeting } = require("../../utils/zoomService");
const { sendEmail } = require("../../utils/mailService");

const create = asyncErrorHandler(async (req, res) => {
  try {
    const { patientId, doctorId, isLiveConsult } = req.body;

    // Check patient  exist
    const isExistPatient = await Patient.findOne({ where: { id: patientId } });
    if (!isExistPatient) {
      return error(res, "Patient not found");
    }
    // Check doctor  exist
    const isExistDoctor = await Doctor.findOne({ where: { id: doctorId } });
    if (!isExistDoctor) {
      return error(res, "Doctor not found");
    }

    //create google meet service
    let zoomMeeting = null;
    if (isLiveConsult === true) {
      zoomMeeting = await createZoomMeeting(isExistDoctor?.email);

      req.body.meetingId = zoomMeeting.id;
      req.body.meetingUrl = zoomMeeting.join_url;
      req.body.startUrl = zoomMeeting.start_url;
      req.body.meetingPassword = zoomMeeting.password;

      await sendEmail(
        "ubaid29170@gmail.com",
        // "r.kmughal66@gmail.com",
        "Your Appointment Details",
        isExistPatient?.name,
        req.body.meetingUrl, 
        req.body.meetingPassword, 
        isExistDoctor?.appointmentCharges 
      );
    }

    req.body.fees = isExistDoctor?.appointmentCharges;

    const data = await Appointment.create(req.body);
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

  const [status, updatedData] = await Department.update(
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

  const { count, rows } = await Appointment.findAndCountAll({
    attributes: { exclude: ["deleted", "patientId", "doctorId"] },
    include: [
      {
        model: Patient,
        as: "patient",
        attributes: ["id", "name", "phone"],
      },
      {
        model: Doctor,
        as: "doctor",
        attributes: ["id", "name", "phone"],
      },
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
  const data = await Appointment.findOne({
    where: { id },
    attributes: { exclude: ["deleted", "patientId", "doctorId"] },
    include: [
      {
        model: Patient,
        as: "patient",
        attributes: ["id", "name", "phone"],
      },
      {
        model: Doctor,
        as: "doctor",
        attributes: ["id", "name", "phone"],
      },
    ],
  });

  return success(res, "Data Found", data, 200);
});

const del = asyncErrorHandler(async (req, res) => {
  const data = await Appointment.findOne({
    where: { id: req.params?.id },
  });

  if (!data) {
    return error(res, TEXTS.NOT_FOUND);
  }

  await Appointment.destroy({
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

const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const { sequelize, User , Chat} = require("../../models");
const { where , QueryTypes} = require("sequelize");
const { success, error } = require("../../utils/response");
const bcrypt = require('bcrypt'); 
const { Op } = require("sequelize"); 
const { faker } = require('@faker-js/faker');

const create = asyncErrorHandler(async (req, res) => {
  try { 
     
    const {password} = req.body;
    
    const isExistEmail = await User.findOne({
      where: { email: req.body.email },
    });
    if (isExistEmail) {
      return error(res, "User already exist");  
    }    

    const hashedPassword = await bcrypt.hash(password, 10);

    req.body.password = hashedPassword
      
    const user = await User.create(req.body);

    return success(res, TEXTS.CREATED, user, 201);
  } catch (err) {
    return error(res, "Failed to create user", [err.message], 500);
  }
});  

const seed = asyncErrorHandler(async (req, res) => {
  try {
     const users = [];

    for (let i = 0; i < 200; i++) {
      const hashedPassword = await bcrypt.hash("12345678", 10); // default password for all

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

  const [status, updatedData] = await User.update(
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
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;
  const search = req.query.search ? req.query.search.trim() : null;
  
  // Assuming you have the current user's ID from authentication
  const currentUserId = req.user.id; // or however you access the logged-in user

  let whereClause = `WHERE u.deleted IS NULL AND u.id != :currentUserId`;
  const replacements = { limit, offset, currentUserId };

  if (search) {
    whereClause += ` AND (u.name ILIKE :search OR u.email ILIKE :search OR u.phone ILIKE :search)`;
    replacements.search = `%${search}%`;
  }

  const users = await sequelize.query(
    `
    SELECT 
      u.*,
      (
        SELECT c."lastMessage"
        FROM "chat" c
        WHERE c.deleted IS NULL 
        AND (
          (c."firstParticipant" = :currentUserId AND c."secondParticipant" = u.id) 
          OR 
          (c."secondParticipant" = :currentUserId AND c."firstParticipant" = u.id)
        )
        ORDER BY c.created DESC
        LIMIT 1
      ) AS "lastMessage",
      (
        SELECT c."isRead"
        FROM "chat" c
        WHERE c.deleted IS NULL 
        AND (
          (c."firstParticipant" = :currentUserId AND c."secondParticipant" = u.id) 
          OR 
          (c."secondParticipant" = :currentUserId AND c."firstParticipant" = u.id)
        )
        ORDER BY c.created DESC
        LIMIT 1
      ) AS "lastMessageRead",
      (
        SELECT c.created
        FROM "chat" c
        WHERE c.deleted IS NULL 
        AND (
          (c."firstParticipant" = :currentUserId AND c."secondParticipant" = u.id) 
          OR 
          (c."secondParticipant" = :currentUserId AND c."firstParticipant" = u.id)
        )
        ORDER BY c.created DESC
        LIMIT 1
      ) AS "lastMessageCreated"
    FROM "user" u
    ${whereClause}
    ORDER BY "lastMessageCreated" DESC NULLS LAST, u.created DESC
    LIMIT :limit OFFSET :offset
    `,
    { replacements, type: QueryTypes.SELECT }
  );

  const totalCountResult = await sequelize.query(
    `SELECT COUNT(*) AS count FROM "user" u ${whereClause}`,
    { replacements, type: QueryTypes.SELECT }
  );
  const totalCount = parseInt(totalCountResult[0].count);

  res.status(200).json({
    statusCode: 200,
    message: "Users fetched successfully",
    data: users,
    count: totalCount,
    limit,
    page,
    pageCount: Math.ceil(totalCount / limit),
  });
});
const getOne = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const data = await User.findOne({
    where: { id },
  });

  return success(res, "User Found", data, 200);
});

const del = asyncErrorHandler(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params?.id },
  });

  if (!user) {
    return error(res, "User not found");
  }

  await User.destroy({
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

const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const { User } = require("../../models");
const { where } = require("sequelize");
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

  const { count, rows } = await User.findAndCountAll({
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

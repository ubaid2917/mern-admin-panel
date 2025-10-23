const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { TEXTS, STATUS_CODES } = require("../../config/constants");
const { Chat, ChatMessages, User } = require("../../models");
const { success, error } = require("../../utils/response");
const { faker } = require("@faker-js/faker");
const { Op } = require("sequelize");

const create = asyncErrorHandler(async (req, res) => {
  try {
    const senderId = req.user.id;

    const { receiverId, message, type = "text" } = req.body;

    const io = req.app.get("io");

    if (!receiverId || !message) {
      return error(res, "Missing required fields", 400);
    }

    // Check if chat already exists
    let chat = await Chat.findOne({
      where: {
        [Op.or]: [
          { firstParticipant: senderId, secondParticipant: receiverId },
          { firstParticipant: receiverId, secondParticipant: senderId },
        ],
      },
    });

    //  If no chat exists, create one
    if (!chat) {
      chat = await Chat.create({
        firstParticipant: senderId,
        secondParticipant: receiverId,
        lastMessage: message,
      });
    }

    // Create message record
    const newMessage = await ChatMessages.create({
      senderId,
      receiverId,
      chatId: chat.id,
      message,
      type,
      isRead: false,
    });

    // Update last message in chat
    await chat.update({ lastMessage: message });

    // Emit real-time event to receiver
    io.to(receiverId).emit("messageReceived", { newMessage });
    io.to(senderId).emit("messageSent", { newMessage });

    // Return success
    return success(res, TEXTS.CREATED, { newMessage }, 201);
  } catch (err) {
    return error(res, "Failed to create record", [err.message], 500);
  }
});

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
  const { search } = req.query;

  let whereCondition = {};

  if (search) {
    whereCondition = {
      [Op.or]: [{ name: { [Op.iLike]: `%${search}%` } }],
    };
  }

  const { count, rows } = await Department.findAndCountAll({
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
  const data = await Department.findOne({
    where: { id },
  });

  return success(res, "Data Found", data, 200);
});

const del = asyncErrorHandler(async (req, res) => {
  const data = await Department.findOne({
    where: { id: req.params?.id },
  });

  if (!data) {
    return error(res, TEXTS.NOT_FOUND);
  }

  await Department.destroy({
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

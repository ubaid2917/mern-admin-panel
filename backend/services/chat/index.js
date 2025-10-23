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

const markAsRead = asyncErrorHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const { chatId } = req.body;  


    if (!chatId) {
      return error(res, "Chat ID is required", 400);
    }

    //  Update all unread messages for this user in this chat
    const [updatedCount] = await ChatMessages.update(
      { isRead: true },
      {
        where: {
          chatId,
          receiverId: userId,
          isRead: false,
        },
      }
    );

    // Emit only if there were messages updated
    if (updatedCount > 0) {
      const io = req.app.get("io"); 
      io.emit("messagesRead", { chatId, userId }); 
    }

    return success(res, "Messages marked as read", null, 200);
  } catch (err) {
    return error(res, "Failed to mark messages as read", [err.message], 500);
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
 try {
    const userId = req.user.id; 
     
    const {receiverId} = req.params; 

    if (!receiverId) {
      return error(res, "Receiver ID is required", 400);
    }

    // Check if chat exists between sender and receiver
    let chat = await Chat.findOne({
      where: {
        [Op.or]: [
          { firstParticipant: userId, secondParticipant: receiverId },
          { firstParticipant: receiverId, secondParticipant: userId },
        ],
      },
    });

    if (!chat) {
      return success(res, "No chat found", []);
    }

    // Fetch messages of this chat
    const messages = await ChatMessages.findAll({
      where: { chatId: chat.id },
      order: [["created", "ASC"]],
    });

    return success(res, "Messages fetched successfully", { messages });

 } catch (err) {
    return error(res, "Failed to fetch records", [err.message], 500);
 }
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
  markAsRead,
  update,
  get,
  getOne,
  del,
};

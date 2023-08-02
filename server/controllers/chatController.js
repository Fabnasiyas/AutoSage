import ChatModel from "../model/chatModel.js";

export const createChat = async (req, res) => {
  const { vendorId, userId } = req.body;

  try {
    // Check if the chat already exists with the given members
    const existingChat = await ChatModel.findOne({
      members: { $all: [userId, vendorId] },
    });

    if (existingChat) {
      // Chat already exists
      return res.status(200).json({ sucess: true });
    }

    // Create a new chat
    const newChat = new ChatModel({
      members: [userId, vendorId],
    });

    const result = await newChat.save();
    res.status(200).json({ sucess: true });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] }
    })
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
};
export const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: {
        $all: [rew.params.firstId, req.params.secondId]
      }
    })
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
}
const getAllChatrooms = (req, res) => {
  res.status(200).json({'message': 'Get all chat rooms'});
}

const ChatappController = {
  getAllChatrooms
}

module.exports = ChatappController;

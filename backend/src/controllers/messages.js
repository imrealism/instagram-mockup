const mockMessages = require('../data/mockMessages');

const messagesController = {
  getConversations: (req, res) => {
    const userId = req.user.id;
    const conversations = mockMessages
      .filter(conv => conv.participants.some(p => p.id === userId))
      .map(conv => ({
        id: conv.id,
        participants: conv.participants.filter(p => p.id !== userId),
        lastMessage: conv.lastMessage
      }));

    res.json({
      success: true,
      conversations
    });
  },

  getMessages: (req, res) => {
    const { conversationId } = req.params;
    const conversation = mockMessages.find(conv => conv.id === parseInt(conversationId));

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }

    res.json({
      success: true,
      messages: conversation.messages
    });
  },

  sendMessage: (req, res) => {
    const { conversationId } = req.params;
    const { text } = req.body;
    const conversation = mockMessages.find(conv => conv.id === parseInt(conversationId));

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }

    const newMessage = {
      id: conversation.messages.length + 1,
      senderId: req.user.id,
      text,
      timestamp: new Date().toISOString()
    };

    conversation.messages.push(newMessage);
    conversation.lastMessage = {
      text,
      timestamp: newMessage.timestamp
    };

    res.status(201).json({
      success: true,
      message: newMessage
    });
  },

  createConversation: (req, res) => {
    const { participantId } = req.body;
    const userId = req.user.id;

    // Check if conversation already exists
    const existingConv = mockMessages.find(conv =>
      conv.participants.some(p => p.id === userId) &&
      conv.participants.some(p => p.id === participantId)
    );

    if (existingConv) {
      return res.json({
        success: true,
        conversationId: existingConv.id
      });
    }

    // Create new conversation
    const newConversation = {
      id: mockMessages.length + 1,
      participants: [
        {
          id: userId,
          username: req.user.username,
          profilePicture: `https://api.multiavatar.com/${req.user.username}.svg`
        },
        {
          id: participantId,
          username: `user_${participantId}`,
          profilePicture: `https://api.multiavatar.com/user_${participantId}.svg`
        }
      ],
      messages: [],
      lastMessage: null
    };

    mockMessages.push(newConversation);

    res.status(201).json({
      success: true,
      conversationId: newConversation.id
    });
  }
};

module.exports = messagesController;
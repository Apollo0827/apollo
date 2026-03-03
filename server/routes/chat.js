const express = require('express');
const OpenAI = require('openai');
const { authMiddleware } = require('../middleware/auth');
const ChatMessage = require('../models/ChatMessage');

const router = express.Router();
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const MOM_RESPONSES = [
  "I love you so much, sweetie! 💕",
  "That's my clever boy! You're doing great! 🌟",
  "Mommy is so proud of you! Keep it up! 🎉",
  "Aww, you make Mommy so happy! 😊",
  "Let's play together soon! 🎮",
  "You're the best kid ever! 💖",
  "Sweet dreams when you go to bed! 🌙",
  "Mommy loves hearing from you! 💝",
  "You're growing up so fast! I'm so proud! 🌈",
  "Have fun and be kind! That's my Carter! ✨",
  "Sending you a big hug! 🤗",
  "You're amazing, honey! Keep smiling! 😄"
];

async function getMommyReply(userMessage) {
  if (openai) {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are Emma, a warm and loving mommy talking to her young son Carter. Keep replies short, sweet, and playful. Use simple words and occasional emojis. Be supportive and affectionate.' },
          { role: 'user', content: userMessage }
        ],
        max_tokens: 80
      });
      return completion.choices[0]?.message?.content?.trim() || MOM_RESPONSES[0];
    } catch (e) {
      console.error('OpenAI error:', e.message);
    }
  }
  const idx = Math.abs(userMessage.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % MOM_RESPONSES.length;
  return MOM_RESPONSES[idx];
}

router.get('/', authMiddleware, async (req, res) => {
  try {
    const messages = await ChatMessage.find({ user: req.user._id })
      .sort({ createdAt: 1 })
      .lean();
    res.json(messages);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) return res.status(400).json({ error: 'Text required' });
    const carterMsg = await ChatMessage.create({
      user: req.user._id,
      sender: 'carter',
      text: text.trim()
    });
    const mommyText = await getMommyReply(text.trim());
    const emmaMsg = await ChatMessage.create({
      user: req.user._id,
      sender: 'emma',
      text: mommyText
    });
    res.json({ carter: carterMsg, emma: emmaMsg });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;

const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const Wallet = require('../models/Wallet');

const router = express.Router();

router.get('/wallet', authMiddleware, async (req, res) => {
  try {
    let wallet = await Wallet.findOne({ user: req.user._id });
    if (!wallet) wallet = await Wallet.create({ user: req.user._id, balance: 100 });
    res.json({ balance: wallet.balance });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/wallet/add', authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    const num = Math.min(1000, Math.max(1, Number(amount) || 10));
    const wallet = await Wallet.findOneAndUpdate(
      { user: req.user._id },
      { $inc: { balance: num }, updatedAt: new Date() },
      { new: true, upsert: true }
    );
    res.json({ balance: wallet.balance });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const GAMES = [
  { id: '44a', name: 'Card Game 44A', description: 'Play cards with Mommy!', icon: '🃏' },
  { id: 'puzzle', name: 'Puzzle Fun', description: 'Solve puzzles with Mommy', icon: '🧩' },
  { id: 'memory', name: 'Memory Match', description: 'Match pairs with Mommy', icon: '🎴' }
];

router.get('/list', authMiddleware, (req, res) => {
  res.json(GAMES);
});

module.exports = router;

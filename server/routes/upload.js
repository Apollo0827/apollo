const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { authMiddleware } = require('../middleware/auth');
const UploadedPicture = require('../models/UploadedPicture');

const router = express.Router();

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `carter-${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /image\/(jpeg|png|gif|webp)/.test(file.mimetype);
    cb(null, allowed);
  }
});

router.post('/', authMiddleware, upload.single('picture'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const pic = await UploadedPicture.create({
      user: req.user._id,
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`
    });
    res.json({ id: pic._id, path: pic.path });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const pictures = await UploadedPicture.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .lean();
    res.json(pictures);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;

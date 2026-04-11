const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, updateProfile, verifySignup, verifyLogin } = require('../controllers/auth');
const { protect } = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Images only!'));
    }
  },
});

router.post('/register', upload.single('profileImage'), registerUser);
router.post('/login', loginUser);
router.post('/verify-signup', verifySignup);
router.post('/verify-login', verifyLogin);
router.get('/me', protect, getMe);
router.put('/update-profile', protect, upload.single('profileImage'), updateProfile);

module.exports = router;

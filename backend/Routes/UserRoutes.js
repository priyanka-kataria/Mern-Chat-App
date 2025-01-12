const express = require('express');
const { registerUser,loginUser, AllUsers } = require('../controller/userController');
const { protect } = require('../middleware/authMiddeware');
const router= express.Router();

router.post('/register', registerUser);
router.post('/login',loginUser);
router.get('/', protect, AllUsers);


module.exports=router;
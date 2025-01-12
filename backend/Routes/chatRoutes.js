const express = require('express');
const { accessChat, fetchChat, createGroupChat, renameGroup, removeFromGroup, addToGroup } = require('../controller/chatController');
const { protect } = require('../middleware/authMiddeware');
const router= express.Router();

router.post("/",protect, accessChat);
router.get("/fetch",protect, fetchChat);
router.post("/group",protect, createGroupChat);
router.put("/rename",protect, renameGroup);
router.put("/removefromgroup",protect, removeFromGroup);
router.put("/addtogroup",protect, addToGroup);


// router.route('/:chatId').get(protect, AllMessage)
module.exports=router;
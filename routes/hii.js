const express = require('express');
const router = express.Router();
const hiiController = require('../controllers/hii_controller');

router.get('/hii',hiiController.hii);

module.exports=router;
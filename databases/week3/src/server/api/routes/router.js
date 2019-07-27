'use strict';
const express = require('express');
const router = express.Router();

// ::V1 router
const userRouter = require('./users/userRouter');

// /api/users
router.use('/users', userRouter);

module.exports = router;

const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

//http://localhost:3001/api/tought
router.use('/tought', thoughtRoutes);

//http://localhost:3001/api/users
router.use('/users', userRoutes);

module.exports = router;

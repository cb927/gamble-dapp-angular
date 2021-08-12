const express = require('express');
const offerRoutes = require('./offer.route');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const emailRoutes = require('./email.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>{
  //res.cookie({ sameSite: 'strict', secure: true });
  res.send('OK')
  }  
);

router.use('/offer', offerRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/email', emailRoutes);
module.exports = router;


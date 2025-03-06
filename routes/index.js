const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index')
})


router.get('/test', (req, res) => {
  res.send('This is the 2nd route called test!')
})


module.exports = router;
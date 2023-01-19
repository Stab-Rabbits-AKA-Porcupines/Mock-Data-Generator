const express = require('express');
const router = express.Router();
const dbController = require('../controllers/dbController');

// dbController is an array of all of our controller functions, NOT an object with controller methods

router.get('/', dbController, (req, res) => {
  const err = 'Please select an option from the dropdown';
  //if res.locals.data.length === 0 then send 500 and {err: you didnt select anything...}
  if (res.locals.data.length === 0) {
    res.locals.data = err;
    return res.status(200).json(res.locals.data);
  } else return res.status(200).json(res.locals.data);
});

module.exports = router;

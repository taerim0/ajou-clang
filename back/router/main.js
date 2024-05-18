const express = require('express');
const session = require('express-session');


const router = express.Router();



router.get('/', async (req, res) => {
    res.json('hello');
})

module.exports = router;
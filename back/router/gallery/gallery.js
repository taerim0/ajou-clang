const express = require('express');
const session = require('express-session');
const multer = require('multer');

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'local/img');
    },
    filename : (req, file, cb) => {
        cb(null, file.originalname + '-' + file.fieldname + '-' + Date.now());
    }
});

const upload = multer({
    storage : storage,
    limits : { fileSize : 30 * 1024 * 1024 },
    fileFilter(req, file, done) {
        if (file.mimetype.lastIndexOf('image') > -1) {
            done(null, true);
        } else {
            done(null, false);
        }
    },

});

const router = express.Router();

router.post('/image_upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            
        }
        else {

        }
    });
});

module.exports = router;
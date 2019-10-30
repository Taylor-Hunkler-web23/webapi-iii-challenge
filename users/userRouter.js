const express = require('express');
const userdb = require('./userDb.js');

const router = express.Router();

// router.post('/', (req, res) => {

// });

// router.post('/:id/posts', (req, res) => {

// });

router.get('/', (req, res) => {
    userdb.get()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: 'The user information could not be retrieved'
            })
        })
});

// router.get('/:id', (req, res) => {

// });

// router.get('/:id/posts', (req, res) => {

// });

// router.delete('/:id', (req, res) => {

// });

// router.put('/:id', (req, res) => {

// });

// //custom middleware

// function validateUserId(req, res, next) {

// };

// function validateUser(req, res, next) {

// };

// function validatePost(req, res, next) {

// };

module.exports = router;

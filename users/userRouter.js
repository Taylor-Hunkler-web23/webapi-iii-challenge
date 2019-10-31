const express = require('express');
const userdb = require('./userDb.js');
const postdb = require('../posts/postDb.js')
const router = express.Router();

// POST user
router.post('/', validateUser, (req, res) => {

    const { name } = req.body;

    userdb.insert(req.body)

        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            console.log('error', err);
            res.status(500).json({ error: "There was an error while saving the user to the database" })
        })

})


router.get('/:id/posts', (req, res) => {
    const id = req.params.id;
    userdb.getUserPosts(id)
        .then(user => res.status(200).json(user))
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The post information could not be retrieved" })
        })
});

//returns list of users
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

//returns user with specified id
router.get('/:id', validateUserId, (req, res) => {
    const id = req.params.id;
    userdb.getById(id)
        .then(user => {

            res.status(200).json(user);

        })


});

//POST a post

router.post('/:id/posts', validatePost, (req, res) => {
    const { id: user_id } = req.params;
    const { text } = req.body;

    postdb.insert({ user_id, text })
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            console.log('error', err);
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })

})



//Delete user with specified id
router.delete('/:id', validateUserId, (req, res) => {
    const id = req.params.id;
    userdb.remove(id)

        .then(removed => {
           
                res.status(200).json({ message: 'Deleted' });

          
        })
        .catch(err => {
            console.log('error', err);
            res.status(404).json({ error: "The user could not be removed" })
        })
})


//Update user
router.put('/:id', validateUserId, (req, res) => {
    const id = req.params.id;
    const { name } = req.body;




    userdb.update(id, req.body)

        .then(user => {

            res.status(200).json(user);


        })

});


// //custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params;
    userdb.getById(id)
        .then(user => {
            if (user) {

                next()
            } else {
                res.status(404).json({ message: "invalid user id" })
            }
        })

};

function validateUser(req, res, next) {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: "missing required name field" })
    }

    else if (!req.body) {
        return res.status(400).json({ message: "missing required body" })
    } else {
        next()
    }


};

function validatePost(req, res, next) {
    const { id: user_id } = req.params;
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: "missing required text field" })
    } else {
        next()
    }
};

module.exports = router;

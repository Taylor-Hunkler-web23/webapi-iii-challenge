const express = require('express');
const userdb = require('./userDb.js');

const router = express.Router();

//POST user
// router.post('/', (req, res) => {

//     const {name} = req.body;
    
//         userdb.insert(req.body)
            
//             .then(user => {
//                 res.status(201).json(user);
//             })
//             .catch(err => {
//                 console.log('error', err);
//                 res.status(500).json({ error: "There was an error while saving the user to the database" })
//             })
    
// })


router.get('/:id/posts', (req, res) => {
const id = req.params.id;
userdb.getUserPosts(id)
.then(user => res.status(200).json(user))
.catch(error => {
    console.log(error);
    res.status(500).json({error: "Error"})
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
router.get('/:id', (req, res) => {
    const id = req.params.id;
    userdb.getById(id)
    .then(user =>{
        if (user) {
            res.status(200).json(user);
        }else{
            res.status(404).json({ message:"The use with the specified id does not exist."})
        }
    })
    .catch(err => {
        console.log('error', err);
        res.status(500).json({error: "The user information could not be retrieved."})
    })

});

// router.get('/:id/posts', (req, res) => {

// });


//Delete user with specified id
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    userdb.remove(id)

        .then(removed => {
            if (removed) {
                res.status(200).json({ message: 'Deleted' });

            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }

        })
        .catch(err => {
            console.log('error', err);
            res.status(404).json({ error: "The user could not be removed" })
        })
})


//Update user
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { name } = req.body;


    

        userdb.update(id, req.body)

            .then(user => {
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(404).json({ message: "The user with the specified ID does not exist." });
                }

            })
            .catch(err => {
                console.log('error', err);
                res.status(404).json({ error: "The user could not be removed" })
            })
    
});


// //custom middleware

// function validateUserId(req, res, next) {
    

// };

// function validateUser(req, res, next) {

// };

// function validatePost(req, res, next) {

// };

module.exports = router;

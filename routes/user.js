let express = require('express');
const axios = require('axios');
let router = express.Router();
let User = require('../models/user')
let Repo = require('../models/repo')
let db = require('../db/mongoose')


// Get all users
router.get('/', function (req, res) {
    User.find(function (err, users) {
        if (err) {
            res.status(500).send(err)
        }
        return res.json({
            "users": users
        })
    })
})

// Get info for specific user
router.get('/:user_id', function (req, res) {
    let username = req.params.user_id
    User.findOne({ userName: req.params.user_id }, function (err, user) {
        if (err) {
            console.log(err)
            return res.status(500).send(err)
        }
        return res.json(user)
    })
})

// Get info for specific user with populated repos
router.get('/:user_id/favrepos', function (req, res) {
    let username = req.params.user_id

    User.findOne({ userName: username })
        .populate('favorite_repos').exec((err, repos) => {
            if (err) {
                console.log(err)
                return res.status(500).send(err)
            }
            return res.send(repos)
        })
})

// Append favorite repos to a specific user
router.post('/:user_id/favrepos', function (req, res) {

    let repo_id = req.body.repo_id
    let name = req.body.name
    let url = req.body.url

    newFavRepo = new Repo({
        _id: db.Types.ObjectId(),
        repo_id, name, url
    })

    newFavRepo.save(function (err) {
        if (err) return res.status(500).send(err);
        User.findOneAndUpdate(
            { userName: req.params.user_id },
            {
                $push: { "favorite_repos": newFavRepo._id }
            },
            { new: true },
            function (err, updatedUser) {
                if (err) return res.status(500).send(err);
                return res.json({
                    'status': 'OK',
                    'user': updatedUser
                });
            });
    })
})

// Delete favorite repo from a specific user and delete that repo
router.delete('/:user_id/favrepos/:repo_name', function (req, res) {
    Repo.findOne({ name: req.params.repo_name }, function (err, repo) {
        if (err) return res.status(500).send(err);
        if (repo == null) {
            return res.status(400).json({ "Message": "Invalid repo" })
        }
        User.findOneAndUpdate(
            { userName: req.params.user_id, favorite_repos: { $elemMatch: { $eq: repo._id } } },
            {
                $pull: { "favorite_repos": repo._id }
            },
            { new: true },
            function (err, updatedUser) {
                if (updatedUser == null) {
                    return res.status(400).json({ "Message": "The user does not like this repo" })
                }
                if (err) return res.status(500).send(err)
                repo.delete(function (err) {
                    if (err) return res.status(500).send(err)
                })
                return res.json({
                    'status': 'OK',
                    'user': updatedUser
                });
            });
    })
})

// Create a user
router.post('/', function (req, res) {
    let userName = req.body.userName
    if (userName == null) {
        return res.status(400).send({ "Message": "Must provide userName" })
    }

    // Create user if not exist
    User.findOne({ userName: userName }).exec((err, user) => {
        if (user == null) {
            let newUser = new User({ userName })

            newUser.save(function (err) {
                if (err) {
                    return res.status(500).send(err)
                } else {
                    return res.json({
                        'status': 'OK',
                        'user': newUser
                    })
                }
            })
        } else {
            return res.status(409).json({ 'Message': 'User already exists' })
        }
    })
})

module.exports = router;

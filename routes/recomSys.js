const express = require('express')
const router = express.Router()

const raccoon = require('raccoon')

raccoon.config.nearestNeighbors = 5
raccoon.config.className = 'course'
raccoon.config.numOfRecStore = 30

//get recommendation for current user
router.get('/:id', (req, res) => {
    raccoon.recommendFor(req.params.id, 5).then(result => {
        res.send(result)
    })
})

//if a user start a course 
router.post('/likedCourse/:id', (req, res) => {
    console.log(req.originalUrl)
    raccoon.liked(req.user.id, req.params.id).then(() => {
        console.log('user ' + req.user.id + ' liked course: ' + req.params.id)
        res.send('user ' + req.user.id + ' liked course: ' + req.params.id)
    })
})

// route for user to unlike a course
router.post('/unlikeCourse/:id', (req, res) => {
    raccoon.unliked(req.user.id, req.params.id).then(() => {
        console.log('user ' + req.user.id + ' unliked course: ' + req.params.id)
        res.send('user ' + req.user.id + ' unliked course: ' + req.params.id)
    })
})

//route for user to dislike a course 
router.post('/dislikedCourse/:id', (req, res) => {
    raccoon.disliked(req.user.id, req.params.id).then(() => {
        console.log('user ' + req.user.id + ' disliked course: ' + req.params.id)
        res.send('user ' + req.user.id + ' disliked course: ' + req.params.id)
    })
})

//route for user to undislike a course 
router.post('/undislikeCourse/:id', (req, res) => {
    raccoon.undisliked(req.user.id, req.params.id).then(() => {
        console.log('user ' + req.user.id + ' undisliked course: ' + req.params.id)
        res.send('user ' + req.user.id + ' undisliked course: ' + req.params.id)
    })
})

//get the most populaire course 
router.get('/mostPopCourses', (req, res) => {
    raccoon.bestRated().then(result => {
        console.log(result)
        res.json(result)
    })
})

//get most similaire users to the current user
router.get('/similairUsers', (req, res) => {

    raccoon.mostSimilarUsers(req.user.id).then(result => {
        res.json(result)
    })
})

module.exports = router
const express = require('express')
const router = express.Router()

const raccoon = require('raccoon')

raccoon.config.nearestNeighbors = 5
raccoon.config.className = 'course'
raccoon.config.numOfRecStore = 30

//get recommendation for current user
router.get('/', (req, res) => {
    raccoon.recommendFor(req.user.id, 5).then(result => {
        console.log(result)
        res.json(result)
    })
})

//if a user start a course 
router.post('/likedCourse/:id', (req, res) => {

    raccoon.liked(req.user.id, req.params.id).then(() => {
        console.log('user ' + req.user.id + ' liked course: ' + req.params.id)
        res.send('user ' + req.user.id + ' liked course: ' + req.params.id)
    })
})

//get the most populaire course 
router.get('/mostPopCourses', (req, res) => {
    raccoon.bestRated().then(result => {
        console.log(result)
        res.json(result)
    })
})

module.exports = router
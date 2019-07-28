const express = require('express')
const router = express.Router()

const raccoon = require('raccoon')

raccoon.config.nearestNeighbors = 5
raccoon.config.className = 'course'
raccoon.config.numOfRecStore = 30

router.get('/:id', (req, res) => {
    raccoon.recommendFor(req.params.id, 5).then(result => {
        console.log(result)
        res.json(result)
    })
})
router.post('/likedCourse/:id', (req, res) => {
    console.log(req.user)
    // raccoon.liked(req.user,req.params.id)
})


module.exports = router
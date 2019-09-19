const Event = require('../../models/Event');

module.exports = async (req, res) => {
    let events = await Event.findAll({ where: { validated: true } })
    let allEvent = []

    events = events.map(event => {
        let index = event.dataValues.start_d.indexOf(' ') + 1
        // console.log('heree')
        // console.log(event.dataValues)
        let today = new Date();
        let eveDate = new Date(event.dataValues.start_d.substring(0, 10));
        if (!eveDate > today) {
            allEvent.push({
                id: event.dataValues.id,
                name: event.dataValues.name,
                location: event.dataValues.location,
                startDay: event.dataValues.start_d,
                description: event.dataValues.description,
                cover: event.dataValues.cover,
                month: event.dataValues.start_d.substring(index, index + 3),
                day: event.dataValues.start_d.substring(0, index)
            })
        }

        return {
            id: event.dataValues.id,
            name: event.dataValues.name,
            location: event.dataValues.location,
            startDay: event.dataValues.start_d,
            description: event.dataValues.description,
            cover: event.dataValues.cover,
            month: event.dataValues.start_d.substring(index, index + 3),
            day: event.dataValues.start_d.substring(0, index),
            upcoming: eveDate > today
        }
    })
    console.log(allEvent)

    res.render('user.events', { events, allEvent })
}
const axios = require('axios')

//functions 
const triggerPush = async (id, payload) => {
    try {
        let req = await axios({
            method: "POST",
            url: `http://localhost:3000/subscribe/triggerPush/${id}`,
            data: {
                payload
            }
        })
        if (req) {
            return req
        }
    } catch (error) {
        console.log(error)
    }
}
const pushToAllSubsecribers = async (payload) => {
    try {
        let req = await axios({
            method: "POST",
            url: `http://localhost:3000/subscribe/triggerPush`,
            data: {
                payload
            }
        })
        if (req) {
            return req
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = { triggerPush, pushToAllSubsecribers }
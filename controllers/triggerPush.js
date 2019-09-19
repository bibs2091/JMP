const axios = require('axios')

//functions 
const triggerPush = async (id, payload) => {
    try {
        let req = await axios({
            method: "POST",
            url: `http://5cc87506.ngrok.io/subscribe/triggerPush/${id}`,
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
            url: `http://5cc87506.ngrok.io/subscribe/triggerPush`,
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
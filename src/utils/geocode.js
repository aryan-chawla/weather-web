const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXJ5YW5jaGF3bGExIiwiYSI6ImNrY2dlZWh6djBhOTAycXFrcmNiZG1jdnoifQ.ckWb-VYGzdYFPL76_YkPNA&limit=1'

    request({url : url, json : true}, (error, response) => {
       
        const {'response.body.features.lenght' : Error} = response
       
        if (error){
            callback('No connection', undefined)
        } else if (Error === 0) {
            callback('No location found', undefined)
        } else{
            callback(undefined, {
            lat : response.body.features[0].center[0],
            lon : response.body.features[0].center[1],
            loc : response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode

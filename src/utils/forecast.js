const request = require('request') 

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e2c50db36fea6cd69986f8d3829b71d3&query=' + latitude + ',' + longitude + '&units=m'

    request({ url : url, json : true}, (error, response) => {
        const {'response.body.error' : Error} = response 
        
        if(error){
            callback('No connection', undefined)
        }
        else if(Error){
            callback('Did not find the coordinates', undefined)
        } else{
            callback(undefined, response.body.current.temperature)
        }
    })
}



module.exports = forecast
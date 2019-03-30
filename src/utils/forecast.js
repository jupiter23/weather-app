const request = require('request')

const key = '73b47ccd12a0bd0372bf4453d35e6bdc'

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}?units=si&lang=de`
  request({
    url,
    json: true 
  }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to the weather service')
    } else if (body.error) {
      callback('Unable to find location')
    } else {
      const { currently } = body
      callback(undefined, {
        summary: body.daily.data[0].summary,
        temperature: currently.temperature,
        rain: currently.precipProbability
      })
    }
  })
}

module.exports = forecast

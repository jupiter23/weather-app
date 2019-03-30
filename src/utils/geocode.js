const request = require('request')

const mapBoxToken = 'pk.eyJ1IjoibW9uYXJxIiwiYSI6ImNqdG45MTdzMzBlbnY0M3FrczB1aTN5d3gifQ.4dWBDwSqWHyCmhf6MhOEmw'
const mapboxUrl = "http://api.mapbox.com/geocoding/v5/mapbox.places"

const geocode = (address, callback) => {
  const url = `${mapboxUrl}/${encodeURIComponent(address)}.json?access_token=${mapBoxToken}&limit=1` 
  request({ 
    url, 
    json: true 
  }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services')
    } else if (body.features.length === 0) {
      callback('No result for this location')
    } else {
      const { center } = body.features[0]
      callback(undefined, {
        latitude: center[1],
        longitude: center[0],
        location: body.features[0].place_name 
      })
    }
  })
}

module.exports = geocode

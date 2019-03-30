console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const weatherMessage = document.querySelector('p#message')
const errorMessage = document.querySelector('p#error')

const clearMessages = () => {
  errorMessage.innerHTML = ""
  weatherMessage.innerHTML = ""
}

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  clearMessages()
  weatherMessage.innerHTML = "Loading"
  fetch(`/weather?address=${search.value}`).then((response) => {
    response.json().then(data => {
      if (data.error) {
        clearMessages()
        errorMessage.innerHTML = data.error
      }
      else {
        weatherMessage.innerHTML = data.location + '<br>' +  data.forecast + '<br>' +  data.summary
      }
    })
  })
})

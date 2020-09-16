const weather = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weather.addEventListener('submit', (event)=>{
    event.preventDefault()
    const location = search.value
    const message = 'provide a location'
    if(!location){
        messageTwo.textContent = message
    }
    else{
        fetch('http://localhost:3000/weatherblahgod?address=' + location).then((response)=>{
            response.json().then((response)=>{
                if(response.error){
                    messageOne.textContent = response.error
                }
                else{
                    messageTwo.textContent = response.location
                    messageTwo.textContent = response.weather
                }
            })
        })
    }
})



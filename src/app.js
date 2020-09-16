const express = require('express')
const hbs = require('hbs')
const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//paths defination
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials/header')
const footerPath = path.join(__dirname, '../templates/partials/footer')

const app = express()

// setting of views for render related coding location and handlebars
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)
hbs.registerPartials(footerPath)

// static
app.use(express.static(publicPath))

// main displaying code
app.get('', (req, res) => {
    res.render('index', {
        name: 'Aryan chawla'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'weather-application',
        name: 'provided by aryan chawla'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'weather app',
        name: 'provided by aryan chawla'
    })
})

app.get('/weatherblahgod', (req, res)=>{
    const address = req.query.address
    if(!address){
        res.send('provide an address')
    }

   else{geocode(address, (error, data)=>{
        if(error){
            res.send('their are some issues with your network')
        }
        else{
            forecast(data.lon, data.lan, (error, forecastdata = {})=>{
                if (error){
                    res.send('issues again')
                }
                else{
                    res.send({
                        location: data.loc,
                        weather: forecastdata
                    })
                console.log(data.loc)
                console.log(forecastdata)
                }
            })
        }
    })
}
})

app.get('*', (req, res)=>{
    res.render('errorpage')
})


app.listen(3000, ()=>{
    console.log('server is up and running')
})

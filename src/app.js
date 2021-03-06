const path    = require('path')
const express = require('express')
const hbs     = require('hbs')
const request = require('postman-request')
const forecast= require('./utils/forcast')
const geocode = require('./utils/Gecoding')
const app = express()
const port= process.env.PORT || 3000


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath           = path.join(__dirname, '../templates/views')
const partialsPath        = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abdelrhman Feysl'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Abdelrhman Feysl'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful ttext.',
        title: 'Help',
        name: 'Abdelrhman Feysl'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error :"please enter address to search for weather "
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({
                error  
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error 
                })
            }
           res.send({
               location,
               forecastData
           })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abdelrhman Feysl',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abdelrhman Feysl',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' +port)
})
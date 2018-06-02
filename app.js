const express = require('express')
const path = require('path')
const hbs = require('hbs')

let app = express()

hbs.registerPartials(path.join(__dirname, 'views', 'partials'))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Something went wrong'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})

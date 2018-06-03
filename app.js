const express = require('express')
const path = require('path')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000

let app = express()

hbs.registerPartials(path.join(__dirname, 'views', 'partials'))
app.set('view engine', 'hbs')

app.use((req, res, next) => {
  let now = new Date().toString()
  let log = `${now}: ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  })
  next()
})

// Uncomment this for the maintenance

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// })

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

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Something went wrong'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})

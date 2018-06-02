const express = require('express')
const path = require('path')

let app = express()

app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>')
  res.send({
    name: 'Greg',
    likes: [
      'books',
      'comics'
    ]
  })
})

app.get('/about', (req, res) => {
  res.send('About Page')
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Something went wrong'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})
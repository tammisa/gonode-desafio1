const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(
  express.urlencoded({
    extended: false
  })
)

app.set('view engine', 'njk')

const checkAge = (req, res, next) => {
  const { age } = req.query

  if (!age) {
    return res.redirect('/')
  }

  return next()
}

app.get('/', (req, res) => {
  return res.render('index')
})

app.post('/check', (req, res) => {
  const { age } = req.body
  if (age >= 18) {
    res.redirect(`/major?age=${age}`)
  } else {
    res.redirect(`/minor?age=${age}`)
  }
})

app.get('/major', checkAge, (req, res) => {
  const { age } = req.query
  return res.render('major', { age })
})

app.get('/minor', checkAge, (req, res) => {
  const { age } = req.query
  return res.render('minor', { age })
})

app.listen(3000)

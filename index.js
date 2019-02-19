const express = require('express')
const nunjunks = require('nunjucks')

const app = express()

nunjunks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')

app.use(express.urlencoded({ extended: false }))

const queryMiddleware = (req, res, next) => {
  req.query.age === undefined ? res.redirect('/') : next()
}

app.get('/', (req, res) => {
  return res.render('form')
})

app.get('/major', queryMiddleware, (req, res) => {
  return res.render('major', { age: req.query.age })
})

app.get('/minor', queryMiddleware, (req, res) => {
  return res.render('minor', { age: req.query.age })
})

app.get('/check', (req, res) => {
  return req.query.age >= 18
    ? res.redirect(`/major?age=${req.query.age}`)
    : res.redirect(`/minor?age=${req.query.age}`)
})

app.listen(3000, () => {
  console.log('server started')
})

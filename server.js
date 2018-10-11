let express = require('express')
let app = express()
let bodyParser = require('body-parser')

let githubAccessTokenRouter = require('./routes/githubAccessToken')
let userRouter = require('./routes/user')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/githubUserToken', githubAccessTokenRouter)
app.use('/users', userRouter)


var listener = app.listen(2888, function () {
  console.log('Listening on port ' + listener.address().port)
})

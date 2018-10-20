let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let cors = require('cors')

let githubAccessTokenRouter = require('./routes/githubAccessToken')
let userRouter = require('./routes/user')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use(cors())
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   next(）
// })

app.get('/', function(req, res) {
  res.send('It is healthy!');
})

app.use('/githubUserToken', githubAccessTokenRouter)
app.use('/users', userRouter)


var listener = app.listen(2888, function () {
  console.log('Listening on port ' + listener.address().port)
})

let express = require("express");
let app = express();
let githubAccessTokenRouter = require('./routes/githubAccessToken')

app.use('/githubUserToken', githubAccessTokenRouter)

var listener = app.listen(2888, function() {
    console.log('Listening on port ' + listener.address().port);
});
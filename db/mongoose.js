var mongoose = require('mongoose')
var config = require('../config')
let User = require('../models/user')
let Repo = require('../models/repo')

mongoose.connect(
    config.db_url,
    { useNewUrlParser: true }
)

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.on('connected', function () {
    if (mongoose.connection.client.s.url.startsWith('mongodb+srv')) {
        mongoose.connection.db = mongoose.connection.client.db('contributions');
    }
    console.log('Connection to MongoDB established.')
});


// Test:
// Save two repos as favorite to one user
// var user1 = new User({
//     _id: new mongoose.Types.ObjectId(),
//     userName: 'tianyi'
// });

// var repo1 = new Repo({
//     _id: new mongoose.Types.ObjectId(),
//     repo_id: 'xma',
//     name: 'Typescript',
//     url: 'http://typescript.com'
// });

// var repo2 = new Repo({
//     _id: new mongoose.Types.ObjectId(),
//     repo_id: 'xmaa',
//     name: 'React',
//     url: 'http://react.com'
// });

// repo1.save(function (err) {
//     if (err) return handleError(err);
//     // thats it!
// });
// repo2.save(function (err) {
//     if (err) return handleError(err);
//     // thats it!
// });
// user1.favorite_repos.push(repo1)
// user1.favorite_repos.push(repo2)

// user1.save(function (err) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('saved successfully!')
//     }
// });

// Retrive two repos from the users favorite_repos
// User.
//     findOne({ userName: 'tianyi' }).
//     populate('favorite_repos').
//     exec(function (err, repos) {
//         if (err) return handleError(err);
//         console.log(repos);
//     });

module.exports = mongoose
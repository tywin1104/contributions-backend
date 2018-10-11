let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    userName: {
        type: String,
        unique: true,
        required: true
    },
    favorite_repos: [{ type: Schema.Types.ObjectId, ref: 'Repo' }]
})

let repoSchema = Schema({
    _id: Schema.Types.ObjectId,
    repo_id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    url: {
        type: String,
        unique: true,
        required: true
    }
})

let User = mongoose.model('User', userSchema);

module.exports = User

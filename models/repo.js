let mongoose = require('mongoose')
let Schema = mongoose.Schema

let repoSchema = Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
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
let Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo
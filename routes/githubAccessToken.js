const express = require('express')
const axios = require('axios')
let router = express.Router()
const config = require('../config')


router.get('/:user_id', function(req, res) {
    let user_id = req.params.user_id
    if(user_id == null) {
        res.status(400).json({
            "Message" : "Must provide the user id"
        })
    }

    let api_token_url = 'https://tywinzhang.auth0.com/oauth/token'

    let data = {
        client_id: config.client_id,
        client_secret: config.client_secret,
        audience: 'https://tywinzhang.auth0.com/api/v2/',
        grant_type: 'client_credentials'
    }
    let headers = {
        'content-type': 'application/json'
    }

    let user_query_url = 'https://tywinzhang.auth0.com/api/v2/users'

    axios.post(api_token_url, data, {"headers": headers})
    .then((response) => {
        let api_token = response.data.access_token
        console.log(`Got access token: ${api_token}`)

        url = `${user_query_url}/${user_id}`
        console.log('Query againest url:', url)

        header_text = `Bearer ${api_token}`
        console.log("Header:", header_text)
        return axios.get(url,{
            "headers": { 'Authorization': header_text}
        })
    })
    .then((response) => {
        if(response.status === 200) {
            res.status(200).send(response.data.identities)
        }else {
            res.send({"Error": response.data})
        }
    })
    .catch((error) => {
        res.send(error.response.data)
        console.log(error.response.data);
        console.log(error.response.status);
    })
})

module.exports = router;
// We used MongoDB Atlas: https://cloud.mongodb.com/v2/602d91ede850d13d46b6bd02#metrics/replicaSet/602d937fea461b33953872b5/explorer/myFirstDatabase/users/find

require('dotenv').config
const express = require('express')
const app = express()
const cors = require('cors')

// Allows us to use res.json (a method provided by express, and adding the below line allows us to access it) instead of res.send. 
app.use(express.json())

// Allows access from all origins. Means that you can access API info from sources other than this folder.
app.use(cors())

// Bodyparser middleware.
app.use(express.urlencoded({extended: false}))

// Controller middleware.
app.use('/api', require('./controllers/users'))

// We use 'process.env.PORT' for if heroku wants to use its own port, no need for us to put it in our .env.
app.listen(process.env.PORT || 8000, () => {
    console.log("Listening on port 8000") // Putting our server on a different port since our client, React, defaults to port 3000.
})
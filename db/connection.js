require('dotenv').config()
const mongoose = require('mongoose')
// This is the format for constant environment variables. 

mongoose.connect('mongodb+srv://dbAdmin:supersonics@sun-voyage-cluster.grew3.mongodb.net/sun-voyage-db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then((instance) =>
        console.log(`Connected to db: ${instance.connections[0].name}`)
    )
    .catch((error) => console.log('Connection failed!', error))

module.exports = mongoose
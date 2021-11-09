const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://deepakgallery:deepaksingh@cluster0.ldcth.mongodb.net/Gallery?retryWrites=true&w=majority', { useNewUrlParser: true })
        .then(connect => console.log('connected to mongodb..'))
        .catch(e => console.log('could not connect to mongodb', e))

module.exports = {mongoose}
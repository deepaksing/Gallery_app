const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/image-gallery', {
	useNewUrlParser: true
}).then(() => {
	console.log('database is connected')
}).catch((err) => {
	console.log('Error connecting to the database', err)
})
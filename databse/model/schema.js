const mongoose = require('mongoose')

const Gallery = mongoose.model('Gallery', {
	imgName : {
		type: String, 
		trim: true
	},
	imgDetails: {
		type: String
	},
	imgURL: {
		type: String,
	}
})

module.exports = Gallery
const express = require('express')
const path = require('path')
const multer = require('multer')
const fs = require('fs')
const ejs = require('ejs')
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('dotenv').config()

///////
const image = require('./databse/model/schema')
require('./databse/mongoose')
const app = express()

  
//initializing
const port = process.env.PORT || 3000
const viewpath = path.join(__dirname, '/views')


// Set
app.set("view engine", "ejs");
app.set('views', viewpath)

//use
app.use(methodOverride('_method'));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))


//Routes
app.get('/', async(req, res) => {
	const all_images = await image.find()
	res.render('index', {images: all_images})
})

app.get('/show/:id', async (req, res) => {
	const img = await image.findById(req.params.id)
	res.render('show', {imgs: img})
})

app.get('/:id/edit', async (req, res) => {
	const img = await image.findById(req.params.id)
	res.render('edit', {imgs: img})
})

app.put('/:id/edit', async (req, res) => {
	var img = await image.findById(req.params.id);
	var desc = img.imgDetails
	var url = img.imgURL;
	if(req.body.imgDetails) {
		desc = req.body.imgDetails
	}
	if(req.body.imgURL) {
		url = req.body.imgURL
	}

	img = await image.findByIdAndUpdate(req.params.id, {
		imgName: req.body.imgName,
  		imgDetails: desc,
  		imgURL: url
	})
	res.redirect('/')
})

app.delete('/:id/delete', async (req, res) => {
	const img = await image.findByIdAndDelete(req.params.id);
	res.redirect('/')
})

app.get('/new', (req, res) => {
	res.render('addImage');
})

app.post('/should', async (req, res) => {
  	console.log(req)
  	const newim = new image({
  		imgName: req.body.imgName,
  		imgDetails: req.body.imgDetails,
  		imgURL: req.body.imgURL
  	})

  	console.log(newim)
  	await newim.save()
  	res.redirect(`/show/${newim.id}`)

})


app.listen(port, () => {
	console.log(`server connected: ${port}`)
})

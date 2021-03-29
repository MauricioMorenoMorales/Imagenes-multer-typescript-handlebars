import dotenv from 'dotenv'
import express from 'express'
import expressHandlebars from 'express-handlebars'
import path from 'path'
import multer from 'multer'
import { v4 as uuid } from 'uuid'

import router from './routes/index.routes'

//Initializations
dotenv.config()
const app = express()

//Settings
app.set('port', process.env.PORT || 5555)
app.set('views', path.join(__dirname, 'views'))
app.engine(
	'.hbs',
	expressHandlebars({
		layoutsDir: path.join(app.get('views'), 'layouts'),
		partialsDir: path.join(app.get('views'), 'partials'),
		defaultLayout: 'main.hbs',
		extname: '.hbs',
	}),
)
app.set('view engine', '.hbs')

const storage = multer.diskStorage({
	destination: path.join(__dirname, 'public/uploads'),
	filename: (req, file, cb) => {
		cb(null, uuid() + path.extname(file.originalname))
	},
})

//Middlewares
app.use(
	multer({
		storage,
		dest: path.join(__dirname, 'uploads'),
		limits: { fileSize: 1000000 },
		fileFilter: (req, file, cb) => {
			const fileTypes = /|jpg|png|gif/
			const mimeType = fileTypes.test(file.mimetype)
			const extname = fileTypes.test(path.extname(file.originalname))
			if (mimeType && extname) return cb(null, true)
			cb(new Error('NO funciona'))
		},
	}).single('image'),
)

//Routes
app.use(router)

// Static files
app.use(express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), () =>
	console.log('>>>>>Server running on port ' + app.get('port')),
)

console.log('xd')

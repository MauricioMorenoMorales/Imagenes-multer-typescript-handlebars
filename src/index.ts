import dotenv from 'dotenv'
import express from 'express'
import expressHandlebars from 'express-handlebars'
import path from 'path'
import multer from 'multer'

import router from './routes/index.routes'

const storage = multer.diskStorage({
	destination: path.join(__dirname, 'public/uploads'),
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	},
})

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

//Middlewares
app.use(
	multer({
		storage,
		dest: path.join(__dirname, 'uploads'),
		limits: { fileSize: 1000000 },
	}).single('image'),
)

//Routes
app.use(router)

app.listen(app.get('port'), () =>
	console.log('>>>>>Server running on port ' + app.get('port')),
)

console.log('xd')

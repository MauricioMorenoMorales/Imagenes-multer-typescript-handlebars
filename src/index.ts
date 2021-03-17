import dotenv from 'dotenv'
import express from 'express'
import expressHandlebars from 'express-handlebars'
import path from 'path'
import multer from 'multer'

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
app.use(multer({ dest: path.join(__dirname, 'uploads') }).single('image'))

//Routes
app.get('/', (req, res) => res.render('index'))

app.post('/upload', (req, res) => {
	console.log(req.file)
	res.send('Uploaded 2')
})

app.listen(app.get('port'), () =>
	console.log('>>>>>Server running on port ' + app.get('port')),
)

console.log('xd')

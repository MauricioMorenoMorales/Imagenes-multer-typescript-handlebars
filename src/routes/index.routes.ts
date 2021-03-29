import { Router, RequestHandler, Response } from 'express'
import multer from 'multer'
import path from 'path'
const router = Router()

router.get('/', (req, res) => res.render('index'))

router.post('/upload', (req, res) => {
	console.log(req.file)
	res.send('Uploaded 2')
})

export default router

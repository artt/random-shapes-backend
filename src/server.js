import express from 'express'
import {test} from 'random-shapes'

const app = express()

app.get('/', (req, res) => {
	res.setHeader('Content-Type', 'image/svg+xml');
	res.status(200).send(`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="400" height="180">
		<rect x="50" y="20" rx="20" ry="20" width="150" height="150" style="fill:red;stroke: black;stroke-width:5;opacity:0.5" /> </svg>`)
})

app.get('/test', (req, res) => {
	res.status(200).send(test())
})

app.listen(3000)
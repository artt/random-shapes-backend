import express from 'express'
import {genBlob, genHLines} from 'random-shapes'

const app = express()

function objToString(style) {
	const x = Object.entries(style).map(([k, v]) => `${k}="${v}"`).join(' ')
	return x.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)
}

app.get('/', (req, res) => {
	res.setHeader('Content-Type', 'image/svg+xml');
	res.status(200).send(`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="600" height="300">
		<path d="M 0 140.16 C 289.48 220.21, 328.47 297.40, 600.00 169.02 " class="" style="fill: transparent; stroke: black;"></path>
		</svg>`)
})

app.get('/blob', (req, res) => {

	const opt = {
		size: 500,
		segments: 8,
		fill: "yellow",
		fillOpacity: 1,
		stroke: "blue",
		strokeWidth: 3,
		strokeOpacity: 1,
		strokeDasharray: "0",
		...req.query
	}

	const style = {
		fill: opt.fill,
		fillOpacity: opt.fillOpacity,
		stroke: opt.stroke,
		strokeWidth: opt.strokeWidth,
		strokeOpacity: opt.strokeOpacity,
		strokeDasharray: opt.strokeDasharray
	}

	const {path} = genBlob(opt.size)

	res.setHeader('Content-Type', 'image/svg+xml');
	res.status(200).send(`
		<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="${opt.size}" height="${opt.size}">
			<path d="${path}" ${objToString(style)} />
		</svg>
	`)
})

app.get('/test', (req, res) => {
	const r = genHLines(600, 300)
	console.log(r)
	res.status(200).send(r[0].curve)
})

app.listen(3000, () => {
	console.log('Server started on port 3000s.')
})
const express = require('express')
const randomShapes = require('random-shapes')
const { genBlob, genHBlobs } = randomShapes
const cors = require('cors')

const app = express()
app.use(cors())

function objToString(style) {
  const x = Object.entries(style).map(([k, v]) => `${k}="${v}"`).join(' ')
  // return x.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)
  return x
}

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'image/svg+xml');
  res.status(200).send(`
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="600" height="300">
      <path d="M 0 140.16 C 289.48 220.21, 328.47 297.40, 600.00 169.02 " class="" style="fill: transparent; stroke: black;"></path>
    </svg>`)
})

// app.get('/blob', (req, res) => {

//   const opt = {
//     size: 500,
//     segments: 8,
//     fill: "teal",
//     fillOpacity: 1,
//     stroke: "blue",
//     strokeWidth: 3,
//     strokeOpacity: 1,
//     strokeDasharray: "0",
//     ...req.query
//   }

//   const style = {
//     fill: opt.fill,
//     fillOpacity: opt.fillOpacity,
//     stroke: opt.stroke,
//     strokeWidth: opt.strokeWidth,
//     strokeOpacity: opt.strokeOpacity,
//     strokeDasharray: opt.strokeDasharray
//   }

//   const {path} = genBlob(opt.size)
//   const paths = [...Array(opt.n).keys()].map(() => genBlob(opt.size))
//   res.setHeader('Content-Type', 'image/svg+xml');
//   res.status(200).send(`
//     <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="${opt.size}" height="${opt.size}">
//       <path d="${path}" ${objToString(style)} />
//     </svg>
//   `)
  
// })

// app.get('/blobs', (req, res) => {

//   const defaultOptions = {
//     numBlobs: 1,
//     size: 500,
//     segments: 8,
//     fill: "teal",
//     fillOpacity: 1,
//     stroke: "blue",
//     strokeWidth: 3,
//     strokeOpacity: 1,
//     strokeDasharray: "0",
//   }

//   const stringKeys = ['fill', 'stroke', 'strokeDasharray']

//   console.log(req.query)

//   const opt = {
//     numBlobs: parseInt(req.query.numBlobs) || defaultOptions.numBlobs
//   }

//   Object.keys(defaultOptions).slice(1).forEach(key => {
//     if (stringKeys.includes(key))
//       opt[key] = (req.query[key] && req.query[key].split(',')) || [defaultOptions[key]]
//     else
//       opt[key] = (req.query[key] && req.query[key].split(',').map(x => parseInt(x))) || [defaultOptions[key]]
//   })

//   const data = genHBlobs(opt.size, opt)
//   const paths = [...Array(opt.numBlobs).keys()].map(i => {
//     const curStyle = {}
//     Object.keys(defaultOptions).slice(3).forEach(key => {
//       curStyle[key] = opt[key][i % opt[key].length]
//     })
//     return(`<path d="${data[i].path}" ${objToString(curStyle)} />`)
//   })
//   res.setHeader('Content-Type', 'image/svg+xml');
//   res.status(200).send(`
//     <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="${opt.size}" height="${opt.size}">
//       ${paths.join('')}
//     </svg>
//   `)

// })

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port 3000.')
})
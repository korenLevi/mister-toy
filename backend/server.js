const express = require('express')
// const cookieParser = require('cookie-parser')
// const session = require('express-session')
const cors = require('cors')
const path = require('path')
const expressSession = require('express-session')

// const toyService = require('./api/toy/toy.service')
// const toyService = require('./services/toy.service')
const app = express()
const http = require('http').createServer(app)


const session = expressSession({
    secret: 'coding is amazing',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
})


app.use(express.json())
app.use(session)
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
    // Express serve static files on production environment
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    // Configuring CORS
    const corsOptions = {
        // Make sure origin contains the url your frontend is running on
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const toyRoutes = require('./api/toy/toy.routes')
const {connectSockets} = require('./services/socket.service')


// routes
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
app.all('*', setupAsyncLocalStorage)

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/toy', toyRoutes)
connectSockets(http, session)

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/toy/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue-router to take it from there
app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


const logger = require('./services/logger.service')
const port = process.env.PORT || 3000
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})
// Toy API (CRUDL)

// LIST
// app.get('/api/toy', (req, res) => {
//     console.log('hey backend');
//     var queryParams = req.query;
//     toyService.query(queryParams).then(toys => {
//         res.send(toys)
//     })
// })

// // READ
// app.get('/api/toy/:toyId', (req, res) => {
//     const { toyId } = req.params
//     toyService.getById(toyId).then(toy => {
//         res.send(toy)
//     })
// })

// // DELETE
// app.delete('/api/toy/:toyId', (req, res) => {

//     const { toyId } = req.params
//     toyService.remove(toyId)
//         .then(() => {
//             res.send('Deleted!')
//         })

// })

// // CREATE
// app.post('/api/toy', (req, res) => {

//     const toy = req.body
//     toyService.save(toy).then((savedToy) => {
//         console.log('Added New Toy: ', savedToy);
//         res.send(savedToy)
//     })
// })

// // UPDATE
// app.put('/api/toy/:toyId', (req, res) => {

//     const toy = req.body
//     toyService.save(toy)
//         .then((savedToy) => {
//             console.log('Toy Updated: ', savedToy);
//             res.send(savedToy)
//         })

// })

// app.listen(port, () => {
//     console.log(`Server ready at http://localhost:${port}`)
// })
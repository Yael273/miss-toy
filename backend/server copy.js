const express = require('express')
const cookieParser = require('cookie-parser')
const toyService = require('./api/toy/toy.service.js')
const cors = require('cors')
const path = require('path')
const app = express()
// const PORT = 3050

// const COOKIE_AGE = 1000 * 15
// const IS_PREMIUM = false

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

// app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

// app.get('/', (req, res) => res.send('Hello there!'))

//List
app.get('/api/toy', (req, res) => {
    console.log('req.query:', req.query)
    // const { title, labels, minSeverity, pageIdx, pageSize, sortByCat, desc } = req.query
    // const { name, maxPrice } = req.query
    // const sortBy = {
    //     sortByCat, desc
    // }
    // const filterBy = {
    //     name, maxPrice
    // }
    // toyService.query(filterBy, sortBy)
    const filterBy = req.query
    toyService.query(filterBy)
        .then((toys) => {
            res.send(toys)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(404).send('Cannot get toys')
        })

})

// Update
app.put('/api/toy/:toyId', (req, res) => {
    // const loggedinUser = userService.validateToken(req.cookies.loginToken)
    // if (!loggedinUser) return res.status(401).send('Cannot update toy')

    const toy = req.body

    console.log('TOY ---------', toy)
    // toyService.save(toy, loggedinUser)
    toyService.save(toy)
        .then((savedToy) => {
            res.send(savedToy)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot update toy')
        })
})

// Create
app.post('/api/toy', (req, res) => {
    // const loggedinUser = userService.validateToken(req.cookies.loginToken)
    // if (!loggedinUser) return res.status(401).send('Cannot add toy')

    const toy = req.body

    // toyService.save(toy, loggedinUser)
    toyService.save(toy)
        .then((savedToy) => {
            res.send(savedToy)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot create toy')
        })
})

//Read - GetById
app.get('/api/toy/:toyId', (req, res) => {

    const { toyId } = req.params
    const { currToyId } = req.cookies

    // let visitCountIds = req.cookies.visitCountIds || []
    // if (!visitCountIds.includes(toyId)) {
    //     if (visitCountIds.length >= 3 && !IS_PREMIUM) {
    //         return res.status(401).send('Wait for a bit')
    //     }
    //     visitCountIds.push(toyId)
    // }


    toyService.get(toyId)
        .then(toy => {
            // res.cookie('visitCountIds', visitCountIds, { maxAge: COOKIE_AGE })
            res.send(toy)
        })
        .catch(err => {
            res.status(418).send(err.message)
        })

})

//Remove
app.delete('/api/toy/:toyId', (req, res) => {
    // const loggedinUser = userService.validateToken(req.cookies.loginToken)
    // if (!loggedinUser) return res.status(401).send('Cannot update toy')

    const { toyId } = req.params
    // toyService.remove(toyId, loggedinUser)
    toyService.remove(toyId)
        .then(() => {
            res.send({ msg: 'Toy removed successfully', toyId })
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot delete toy')
        })
})

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

const port = process.env.PORT || 3030;

app.listen(port, () => console.log('Server ready at port', port))
const express = require('express')
const mongoose = require('mongoose')

var app = express()
var Note = require('./noteSchema')

mongoose.connect('mongodb://localhost/iosNotes', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

mongoose.connection.once('open', () => {

    console.log('connected to database!')

}).on('error', (err) => {

    console.log('Failed to connect!')
    console.log(err)
})

const port = 8081
const host = '192.168.1.167'

var server = app.listen(port, host, () => {
    console.log('Server is running at http://' + host + ':' + port)
})


// CREATE A NOTE
// POST request

app.post('/create', (request, response) => {

    var note = new Note({
        title: request.get('title'),
        date: request.get('date'),
        note: request.get('note')
    })

    note.save().then(() => {
        if (note.isNew == false) {
            console.log('note saved!')
            response.send('note saved!')
        } else {
            console.log('failed to save the note')
        }
    })
})

// DELETE A NOTE
// POST request
app.post('/delete', (req, res) => {

    Note.findOneAndRemove({
        _id: req.get('id')
    }, (err) => {
        if (err) {
            console.log("Failed to delete " + req.get('id') + "!")
            console.log(err)
        }
    })

    res.send('Deleted ' + req.get('id') + '!')
})

// UPDATE A NOTE
// POST request
app.post('/update', (req, res) => {
    Note.findOneAndUpdate({
        _id: req.get('id')
    }, {
        title: req.get('title'),
        date: req.get('date'),
        note: req.get('note')
    }, (err) => {
        if (err) {
            console.log("Failed to update " + req.get('id') + "!")
            console.log(err)
        }
    })

    res.send('Updated ' + req.get('id') + '!')
})

// FETCH ALL NOTES
// GET request
app.get('/fetch', (request, response) => {
    Note.find({}, (err) => {
        if (err) {
            console.log('Failed to fetch all notes!')
            console.log(err)
        }
    }).then((notes) => {
        console.log('Fetched ' + notes.length + ' notes!')
        response.send(notes)
    })
})
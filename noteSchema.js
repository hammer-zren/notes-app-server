var mongoose = require('mongoose')
var Schema = mongoose.Schema

var note = new Schema({
    title: String,
    date: String,
    note: String
})

const Note = mongoose.model('note', note)

module.exports = Note
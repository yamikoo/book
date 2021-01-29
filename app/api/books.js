import axios from 'axios';
import { BookModel } from '../models/book';
const express = require('express')
const app = express()
app.use(express.json()) // application/json
app.use(express.urlencoded({ extended: true })) // application/x-www-form-urlencoded

app.get('/', async (req, res) => {
    res.json(await BookModel.books())
})

app.post('/', async (req, res) => {
    const result = await BookModel.addBook(req.body)
    console.log(result)
    res.json('hoge')
})

app.delete('/', async (req, res) => {
    res.json(await BookModel.deleteBook(req.body.book_id))
})

app.get('/:search', async (req, res) => {
    const title = encodeURI(req.params.search)
    const endpoint = 'https://www.googleapis.com/books/v1';
    const result = await axios
        .get(`${endpoint}/volumes?q=${title}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
    res.send(result)
})
module.exports = app

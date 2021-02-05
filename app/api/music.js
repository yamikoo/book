import axios from 'axios';
import { BookModel } from '../models/book';
const express = require('express')
const app = express()
app.use(express.json()) // application/json
app.use(express.urlencoded({ extended: true })) // application/x-www-form-urlencoded

app.get('/', async (req, res) => {
    const title = encodeURI(req.query.term)
    const endpoint = 'https://itunes.apple.com/search?country=jp&media=music&entity=musicTrack&lang=ja_jp&limit=10';
    const result = await axios
        .get(`${endpoint}&term=${title}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return [];
        });
    res.send(result)
})
module.exports = app

const express = require('express');
const app = express();
const bodyparser = require("body-parser");

const cors = require('cors');
app.use(cors());
app.use(bodyparser.json());

const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');



MongoClient.connect('mongodb://localhost:27017')
    .then((client) => {
        const db= client.db('bookingsdb');
        const bookingsCollection = db.collection('bookings');
        const bookingsRouter = createRouter(bookingsCollection);
        app.use('/api/bookings', bookingsRouter)
    })
    .catch(console.err)

app.listen(3000, function () {
    console.log(`listening on port ${this.address().port}`);
})
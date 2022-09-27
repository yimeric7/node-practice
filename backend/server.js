// hides port # or connection string for database (security)
require('dotenv').config()

// importing express
const express = require('express');
// importing router for page requests
const workoutRoutes = require('./routes/workoutRoute');
// import database
const mongoose = require('mongoose');


// initlizing express
const app = express();

// middleware (req to res) - MODEL
app.use(express.json())


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// middle ware that calls all routes ( event handles)
app.use('/api/workouts', workoutRoutes)



mongoose.connect(process.env.MONGO_URI)
    // only listen for request if database connects
    .then(() => {
        // listening for requests 
        app.listen(process.env.PORT, () => {
            console.log(`connected to db & listening on port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error);
    })



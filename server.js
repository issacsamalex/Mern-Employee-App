require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnection');
const employeesRoute = require('./routes/api/employees');
const authRoute = require('./routes/api/auth');
const credentials = require('./middleware/credential');
const refreshRoutes = require('./routes/api/refresh');
// const userRoutes = require('./routes/api/userRoutes')




const PORT = process.env.PORT;

// Connect to MongoDB
connectDB();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors())

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({extended: false}));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use(bodyParser.json());

// serve static files
// app.use(express.static(path.join(__dirname, '/build')));



//Routes
app.use('/auth', authRoute);

app.use('/refresh', refreshRoutes);


app.use('/dash/employees', employeesRoute);

// app.use('/users', userRoutes); // Use only for Developement phase


app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', function (_, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'), function(error){
        res.status(500).send(error);
    })
})




mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=> console.log(`Server is running on ${PORT}`));
});




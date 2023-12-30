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
const refreshRoutes = require('./routes/api/refresh');
// const userRoutes = require('./routes/api/userRoutes')




const PORT = process.env.PORT;

// Connect to MongoDB
const newConnectDB = async () => {
    try {
        await connectDB();
    } catch (error) {
        console.log(error)
    }
}


// Cross Origin Resource Sharing
app.use(cors({
    origin: ['http://localhost:3000', 'https://crowded-teal-sawfish.cyclic.app'],
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true
}))

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({extended: false}));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use(bodyParser.json());


//Routes
app.use('/api/v1/auth', authRoute);

app.use('/api/v1/refresh', refreshRoutes);


app.use('/api/v1/dash/employees', employeesRoute);

// app.use('/users', userRoutes); // Use only for Developement phase


// serve static files
app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', function (_, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'), function(error){
        res.status(500).send(error);
    })
})


newConnectDB().then(()=> {
    app.listen(PORT, ()=> console.log(`Server is running on ${PORT}`));
})






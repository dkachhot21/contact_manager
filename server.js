const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const contactRoutes = require("./routes/contactRoutes");
const userRoutes=require("./routes/userRoutes");
const errorHandler = require('./middleware/errorHandler');
const {constants} = require('./constants');
const connectDB = require('./config/dbConnection');
const PORT = process.env.PORT || 3000;

//Connect to Database
connectDB();
const app = express();

app.get('/', (req, res) => {
    res.send(`API is running on port ${PORT}`);
});

//Middleware
app.use(cors())
app.use(express.json()); //Parsing the JSON data  from client side to server side



//Routes
app.use("/contact", contactRoutes);
app.use("/user",userRoutes);


app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
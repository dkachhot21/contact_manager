//server.js
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors());
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const PORT = process.env.PORT || 3000;

//Initialize Express app

//Swagger setup
const swaggerOptions = {

    swaggerDefinition: {
        openapi: '3.0.3',
        info: {
            title: 'Backend Infrastructure of a Contact Manager Application',
            description:'**1.) Authentication:**\n\n \ta.) User First Registers in the platform\n\n\tb.) Login will return an access token \n\n\tc.) Use token for authorization in the authorization button\n\n'+
                        '**2.) Authorization and CRUD:**\n\n \ta.) Create some contacts under the existing user i.e {POST: /api/contacts} (one with the current token)\n\n\tb.)Use the other routes to perform the CRUD operations\n\n'+
                        '*NOTE* : The token will expire every 30 min for demonstration purposes, the user needs to login again after 30 min ',
            version: '0.0.1',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    in: 'header',
                    name: 'Authorization',
                    description: 'Bearer Token',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        // security: [{
        //     bearerAuth: [],
        // },],
        servers: [
            {
            url: 'http://localhost:3000/',
            description: 'Local server',
            },
        ],
    }, 
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));



app.get('/', (req, res) => {
    res.send(`API is running on port ${PORT}`);
});

//Middleware
app.use(express.json()); //Parsing the JSON data  from client side to server side

//Connect to Database
connectDB();

//Routes
app.use("/contact", contactRoutes);
app.use("/user", userRoutes);

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
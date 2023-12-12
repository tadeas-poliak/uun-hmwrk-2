const express = require("express");

var bodyParser = require('body-parser')
const app = express();

//API's / Controllers / Middlewares
const authentication_middleware = require("./Controller/Middleware/authenticate.middleware");

app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 1000000 }));
app.use(bodyParser.json());
app.use(express.json());



app.post('/protected', authentication_middleware.authenticate_token, (req, res) => {
    // Accessible only to authenticated users
    res.json({ message: 'Protected resource accessed' });
  });

app.post('/login', authentication_middleware.login);


//Getting Item router
const item_router = require("./Router/Item.router");
app.use("/item",item_router);

//Getting Shoppin list router
const list_item_router = require("./Router/ListItem.router");
app.use("/shoppingList",list_item_router);


module.exports = app;

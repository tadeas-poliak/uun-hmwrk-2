const express = require("express");
const path = require("path")
var bodyParser = require('body-parser')
const app = express();


//API's / Controllers / Middlewares
const authentication_middleware = require("./Controller/Middleware/authenticate.middleware");

app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 1000000 }));
app.use(bodyParser.json());
app.use(express.json());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../build')));


app.post('/protected', authentication_middleware.authenticate_token, (req, res) => {
    // Accessible only to authenticated users
    res.json({ message: 'Protected resource accessed' });
  });

app.post('/login', authentication_middleware.login);


//Getting Item router
const item_router = require("./Router/Item.router");
app.use("/api/item",item_router);

//Getting Shoppin list router
const list_item_router = require("./Router/ListItem.router");
app.use("/api/shoppingList",list_item_router);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});


module.exports = app;

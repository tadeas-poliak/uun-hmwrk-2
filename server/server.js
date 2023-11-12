const express = require("express");

var bodyParser = require('body-parser')
const app = express();


app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 1000000 }));
app.use(bodyParser.json());
app.use(express.json());



app.post("/item/getAll", (req, res) => {
    res.send();
});




app.listen(8080, "localhost", () => {
    console.log("Server bezi " + "localhost" + ":" + 8080);
});
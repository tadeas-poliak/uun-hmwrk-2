const express = require("express");

var bodyParser = require('body-parser')
const app = express();

//API's / Controllers / Middlewares
const authentication_middleware = require("./Controller/Middleware/authenticate.middleware");
const item_controller = require("./Controller/Item.controller");

app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 1000000 }));
app.use(bodyParser.json());
app.use(express.json());


//Login
app.get("/", (req, res) => {
    // HTML for login page with styles
    res.send(`
    <html>
      <head>
        <title>JWTLogin</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background-color: #f5f5f5;
          }
  
          .login-container {
            width: 400px;
            padding: 20px;
            border-radius: 4px;
            background-color: #CF9FFF;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
  
          h1 {
            text-align: center;
          }
  
          label {
            display: block;
            margin-bottom: 8px;
          }
  
          input[type="text"],
          input[type="password"] {
            width: 100%;
            padding: 8px;
            border-radius: 4px;
            border: 1px solid #ccc;
          }
  
          button[type="submit"] {
            width: 100%;
            padding: 8px;
            margin-top: 16px;
            border: none;
            border-radius: 4px;
            background-color: #5D3FD3;
            color: #ffffff;
            font-weight: bold;
            cursor: pointer;
          }
  
          button[type="submit"]:hover {
            background-color: #ac7fdc;
          }
          :root {
            --drop-height: 200px;
            --logo-size: 48px;
            --offset: 50px;
            --shadow-height: 8px;
          }
          
          html, body {
            height: 100%;
            width: 100%;
            margin: 0;
          }
          
          .container {
            width: 100%;
            height: 100%;
            background-color: lightgray;
            position: relative;
          }
          
          .logo {
            width: var(--logo-size);
            height: var(--logo-size);
            border-radius: 100%;
            background-color: salmon;
            
            position: absolute;
            top: var(--offset);
            left: calc(50% - var(--logo-size)/2);
          }
        </style>
      </head>
      <body>
        <div class="login-container">
          <h1>Login Page</h1>
          <form method="POST" action="/login">
            <div>
              <label for="username">Username:</label>
              <input type="text" id="username" name="username" required>
            </div>
            <div>
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" required>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </body>
    </html> `);
});



app.get('/protected', authenticateToken, (req, res) => {
    // Accessible only to authenticated users
    res.json({ message: 'Protected resource accessed' });
  });

app.post('/login', authentication_middleware.login);

app.post("shoppingList/create",authentication_middleware.authenticateToken, )//schopping list controller create
app.post("shoppingList/update/:id")
app.get("shoppingList/getAll")
app.get("shoppingList/get/:id")
app.post("shoppingList/delete/:id")
app.post("shoppingList/addMember/:id")
app.post("shoppingList/item/add/:id")
app.post("shoppingList/item/getAll")

app.post("item/add",authentication_middleware.authenticateToken,item_controller.add)
app.post("item/get/:id",authentication_middleware.authenticateToken,item_controller.add)
app.post("item/getAll",authentication_middleware.authenticateToken,item_controller.get_all)
app.post("item/delete/:id",authentication_middleware.authenticateToken,item_controller.delete)



app.listen(8080, "localhost", () => {
    console.log("Server bezi " + "localhost" + ":" + 8080);
});
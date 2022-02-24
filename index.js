const express = require("express");
const mongoose = require("mongoose");

const sessionController = require("./controller/session-controller");
const roleController = require("./controller/role-controller");
const userController = require("./controller/user-controller");

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//database 
mongoose.connect('mongodb://localhost:27017/ecom', function (err) {
    if (err) {
        console.log("db connection fai .. .. . ");
        console.log(err);
    } else {
        console.log("db Connected....");
    }
})

//urls 

app.get('/', (req, res) => {
    res.write("Hello world This is main page")
    res.end()
})

app.get("/login", sessionController.login);
app.get("/signup", sessionController.signup);
app.post("/saveuser", sessionController.saveuser);
// app.get('/login', (req, res) => {
//     res.write("Login Page")
//     res.end()
// })
// app.get('/signup', (req, res) => {
//     res.sendFile('/views/signup.html', { root: __dirname });
// })

app.post("/roles", roleController.addRole)
app.get("/roles", roleController.getAllRoles)
app.delete("/roles/:roleId", roleController.deleteRole)
app.put("/roles", roleController.updateRole)

//user 
app.post("/users", userController.addUser)
app.get("/users", userController.getAllUsers)
app.delete("/users/:userId", userController.deleteUser)
app.put("/users", userController.updateUser)
app.post("/login", userController.login)


app.listen(3000, () => {
    console.log("This is callback function");
})
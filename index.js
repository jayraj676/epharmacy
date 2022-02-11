const express = require("express");
const sessionController = require("./controller/session-controller")


const app = express();

app.get('/', (req, res) => {
    res.write("Hello world This is main page")
    res.end()
})

app.get("/login", sessionController.login);
app.get("/signup", sessionController.signup);

// app.get('/login', (req, res) => {
//     res.write("Login Page")
//     res.end()
// })
// app.get('/signup', (req, res) => {
//     res.sendFile('/views/signup.html', { root: __dirname });
// })

app.listen(3000, () => {
    console.log("This is callback function");
})
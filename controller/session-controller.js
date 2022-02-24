const fs = require("fs");


function login(req, res) {

    res.write("Login Page");
    res.end();
}

function signup(req, res) {
    let signupHtml = fs.readFileSync("./views/signup.html")
    res.write(signupHtml);
    res.end();
}
function saveUser(req, res) {
    console.log(req.body);

    res.json({
        msg: "done completely",
        status: 200,
        data: req.body
    })
}

module.exports.saveuser = saveUser;
module.exports.login = login;
module.exports.signup = signup;
const bcrypt = require("bcrypt")
const e = require("express")
const UserModel = require("../model/user-model")

//add [POST]

module.exports.addUser = function (req, res) {

    let firstName = req.body.firstName
    let email = req.body.email
    let password = req.body.password

    // encrypt using bcrypt

    let encPassword = bcrypt.hashSync(password, 10)

    let role = req.body.role

    let user = new UserModel({
        firstName: firstName,
        email: email,
        password: encPassword,
        role: role
    })

    user.save(function (err, data) {
        if (err) {
            res.json({ msg: "Something Went Wrong!!", status: -1, data: err })
        }
        else {
            res.json({ msg: "Sign Up Done", status: 200, data: data })
        }
    })
}

// List

module.exports.getAllUsers = function (req, res) {
    UserModel.find().populate("role").exec(function (err, data) {
        if (err) {
            res.json({ msg: "Something Went Wrong!!", status: -1, data: err })
        }
        else {
            res.json({ msg: "Users retrived", status: 200, data: data })
        }
    })
}


// delete

module.exports.deleteUser = function (req, res) {
    // params userId

    let userId = req.params.userId

    UserModel.deleteOne({ _id: userId }, function (err, data) {
        if (err) {
            res.json({ msg: "Something Went Wrong!!", status: -1, data: err })
        }
        else {
            res.json({ msg: "User Removed..", status: 200, data: data })
        }
    })
}

// update user
module.exports.updateUser = function (req, res) {
    let paramUserId = req.body.userId
    let paramEmail = req.body.email
    let paramPassword = req.body.password

    UserModel.updateOne({ _id: paramUserId }, { emial: paramEmail, password: paramPassword }, function (err, data) {
        if (err) {
            res.json({ msg: "Something Went Wrong", status: -1, data: err })
        }
        else {
            res.json({ msg: "User Modified..", status: 200, data: data })
        }
    })
}

//login
module.exports.login = function (req, res) {
    let param_email = req.body.email
    let param_password = req.body.password

    let isCorrect = false;

    UserModel.findOne({ email: param_email }, function (err, data) {

        if (data) {
            let ans = bcrypt.compareSync(param_password, data.password)
            if (ans == true) {
                isCorrect = true;
            }
        }

        if (isCorrect == false) {
            res.json({ msg: "Invalid Credentials...!!", status: -1, data: req.body })
        }
        else {
            res.json({ msg: "Login Successfull...", status: 200, data: data })
        }
    })
}
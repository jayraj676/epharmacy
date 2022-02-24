const RoleModel = require("../model/role-model");


module.exports.addRole = function (req, res) {
    //db insert role 
    console.log(req.body.roleName);

    let role = new RoleModel({
        roleName: req.body.roleName
    })

    role.save(function (err, success) {
        if (err) {
            console.log(err);

            res.json({ msg: "Something Went Wrong", status: -1, data: req.body })
        }
        else {
            res.json({ msg: "role added", status: 200, data: success })
        }
    })
}


module.exports.getAllRoles = function (req, res) {
    // model
    // REST 

    RoleModel.find(function (err, roles) {
        if (err) {
            res.json({ msg: "Something Went Wrong!!", status: -1, data: err })
        }
        else {
            res.json({ msg: "roles....", status: 200, data: roles })
        }
    })
}


module.exports.deleteRole = function (req, res) {
    let roleId = req.param.roleId
    // delete from role where roleId = 1

    RoleModel.deleteOne({ "_id": roleId }, function (err, data) {
        if (err) {
            res.json({ msg: "Something Went Wrong !!", status: -1, data: err })
        }
        else {
            res.json({ msg: "Removed....", status: 200, data: data })
        }
    })
}


module.exports.updateRole = function (req, res) {

    // update role set rolename = admin where roleId = 1234
    let roleId = req.body.roleId
    let roleName = req.body.roleName

    RoleModel.updateRole({ _id: roleId }, { roleName: roleName }, function (err, data) {
        if (err) {
            res.json({ msg: "Something Went Wrong!!", status: -1, data: err })
        }
        else {
            res.json({ msg: " Role Updated...", status: 200, daata: data })

        }
    })
}


const User = require("../models/User.model")
const jwt = require("jsonwebtoken")

const createUser = async (req, res) => {
    let newUser = new User(req.body);
    try {
        let user = await newUser.save();
        let token = jwt.sign(user._id.toJSON(), process.env.SECRET);
        res.status(200).json({ user,token });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const loginUser = async (req, res) => {
    try {
        let user = await User.findOne({ password: req.body.password, name: req.body.name });
        if (user) {
            let token = jwt.sign(user._id.toJSON(), process.env.SECRET);
            res.status(200).json({user,token});
        }
        else res.status(200).json({token:""});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const updateUser = async (req, res) => {
    try {
        let user = await User.findById(req.userId);
        await user.update(req.body);
        await user.save();
        res.status(200).send("the user is updeted!");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { createUser, loginUser, updateUser }
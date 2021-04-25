const jwt = require("jsonwebtoken");
const User = require("../models/User.model")

const checkPermission = async (req, res, next) => {
    let decoded = jwt.verify(req.headers.authorization, process.env.SECRET);
    try {
        let user = await User.findById(decoded);
        if (user) {
            req.userId = user._id;
            return next();
        }
        else res.status(404).send("Sorry, This user is not found");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = { checkPermission }
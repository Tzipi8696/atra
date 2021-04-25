const jwt = require("jsonwebtoken");
const request = require("request");
const Picture = require("../models/Picture.model");
const User = require("../models/User.model");

const createPictureByRequest = async (req, res) => {
    try {
        let user = await User.findById(req.userId);
        const options = {
            method: 'GET',
            url: "https://api.nasa.gov/planetary/apod?api_key=toQ0mhoHkgjjimakR6TSM5fHUxbIsYX7sgoQwbVy"
        }
        request(options, async function (err, response, body) {
            if (err)
                res.status(500).send("The access to NASA-API is failed");
            else {
                let newPicture = new Picture({
                    date: JSON.parse(body).date,
                    explanation: JSON.parse(body).explanation,
                    mediaType: JSON.parse(body).media_type,
                    title: JSON.parse(body).title,
                    url: JSON.parse(body).url,
                    userId: user._id
                });
                await newPicture.save();
                user.pictures.push(newPicture);
                await user.save();
                res.status(200).json(newPicture);
            }
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const createPictureByUser = async (req, res) => {
    try {
        let user = await User.findById(req.userId);
        let newPicture = new Picture(req.body);
        newPicture.userId = user._id;
        await newPicture.save();
        user.pictures.push(newPicture);
        await user.save();
        res.status(200).json(newPicture)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deletePicture = async (req, res) => {
    try {
        let user = await User.findById(req.userId);
        let pictureToDelete = await Picture.findByIdAndDelete(req.params.pictureId);
        if (!pictureToDelete)
            res.status(200).send("This picture is not found!!")
        user.pictures.remove(pictureToDelete._id);
        user.save();
        res.status(200).json({msg:"This picture is deleted!!"})
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getHistory = async (req, res) => {
    try {
        let user = await User.findById(req.userId).populate('pictures');
        res.status(200).json({ name: user.name, history: user.pictures })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { createPictureByRequest, getHistory, createPictureByUser ,deletePicture}
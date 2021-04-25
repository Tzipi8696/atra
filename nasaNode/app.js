const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const router = require("./routes/api")

const cors = require("cors");
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, authorization, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

const connectionParams = {
    newUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.DB_CONNECTION, connectionParams)
    .then(() => {
        console.log("connected to db!!")
    })
    .catch((err) => {
        console.log("error" + err.message)
    })

app.use(bodyParser.json());

app.use("/", router)

app.listen("4000", () => {
    console.log("listening on port 4000 now!")
})
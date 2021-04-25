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



//app.use(express.bodyParser({ limit: '100mb' }));
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Request-Method", "POST");
//     // res.header("Access-Control-Allow-Headers",
//     //     "Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR");
//     // if (req.headers.origin) {
//     //     res.header('Access-Control-Allow-Origin', req.headers.origin);
//     // }
//     // if (req.method === 'OPTIONS') {
//     //     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
//     //     return res.status(200).json({});
//     // }
//     next();
// });



app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, authorization, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});


// app.use(function (req, res, next) { //allow cross origin requests
//     res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Credentials", true);
//     //res.status(200).json({});
//     next();
// });

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

// app.all('*', (req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     next();
// });

app.listen("4000", () => {
    console.log("listening on port 4000 now!")
})
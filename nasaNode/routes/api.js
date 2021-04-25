const route = require("express").Router();
const { checkPermission } = require("../middlewares/user.middlware")
const user = require("../controllers/user.controller")
const picture=require("../controllers/picture.controller")

//user:
route.post("/user/create", user.createUser);
route.post("/user/login",user.loginUser);
route.patch("/user/update",checkPermission,user.updateUser);

//picture:
route.post("/picture/createByRequest",checkPermission,picture.createPictureByRequest);
route.post("/picture/createByUser",checkPermission,picture.createPictureByUser);
route.delete("/picture/delete/:pictureId",checkPermission,picture.deletePicture)
route.get("/picture/getHistory",checkPermission,picture.getHistory);

module.exports = route;
const router = require("express").Router();
const controller = require("../Controller/Item.controller");
const authentication_middleware = require("../Controller/Middleware/authenticate.middleware")

router.post("/create",authentication_middleware.authenticate_token,controller.create)
router.get("/get/:id",controller.get_by_id)
router.get("/getAll",controller.get_all)
router.post("/delete/:id",authentication_middleware.authenticate_token,controller.delete)
router.post("/update",authentication_middleware.authenticate_token,controller.update)


module.exports = router;
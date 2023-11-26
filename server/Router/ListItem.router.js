const router = require("express").Router();
const controller = require("../Controller/ListItem.controller");
const authentication_middleware = require("../Controller/Middleware/authenticate.middleware")

router.post("/create",authentication_middleware.authenticate_token, controller.create)
router.post("/update",authentication_middleware.authenticate_token,controller.update)
router.get("/getAll",controller.get_all)
router.get("/get/:id",controller.get_by_id)
router.post("/delete/:id",authentication_middleware.authenticate_token,controller.delete)

router.post("/add/member/:list_id/:user_id",authentication_middleware.authenticate_token,controller.add_member)
router.post("/remove/member/:list_id/:user_id",authentication_middleware.authenticate_token,controller.remove_member)

router.post("/add/item/:list_id/:item_id",authentication_middleware.authenticate_token,controller.add_item)
router.post("/remove/item/:list_id/:item_id",authentication_middleware.authenticate_token,controller.remove_item)
router.get("/getAll/item/:list_id",authentication_middleware.authenticate_token)

module.exports = router;
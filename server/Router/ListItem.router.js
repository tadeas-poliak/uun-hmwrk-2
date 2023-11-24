const router = require("express").Router();
const controller = require("../Controller/ShoppingList.controller");
const authentication_middleware = require("../Controller/Middleware/authenticate.middleware")

router.post("/create",authentication_middleware.authenticate_token, controller.create)
router.post("/update/:id",authentication_middleware.authenticate_token)
router.get("/getAll",controller.get_all)
router.get("/get/:id",controller.get_by_id)
router.post("/delete/:id",authentication_middleware.authenticate_token)
router.post("/addMember/:id",authentication_middleware.authenticate_token)
router.post("/item/add/:id",authentication_middleware.authenticate_token)
router.post("/item/getAll",authentication_middleware.authenticate_token)

module.exports = router;
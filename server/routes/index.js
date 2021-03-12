const router = require('express').Router()
const userController = require('../controllers/userController')
const articleController = require('../controllers/articleController')
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.post("/register", userController.register)
router.post("/login", userController.login)

router.use(authentication)
router.get("/articles", articleController.showArticle);
router.post("/articles", articleController.addArticle);

module.exports = router
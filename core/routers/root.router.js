const router = require("express").Router()
const controller = require('../controllers/root.controller')

router.get("/", controller.indexAction)

module.exports = router
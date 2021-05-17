const router = require("express").Router()
const controller = require('../controllers/auth.controller');

router.post("/", controller.authenticateAction)
router.post("/create", controller.createAction)

module.exports = router
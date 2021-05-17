const router = require("express").Router()
const controller = require('../controllers/channel.controller')

router.post('/:id', controller.createChannelAction)
router.post('/:id/broadcast', controller.sendBroadcastAction)

module.exports = router

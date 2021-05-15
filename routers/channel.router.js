var controller = require('../controllers/channel.controller');

module.exports = (app, io) => {
    app.post('/channel/:id', controller.createChannelAction);
	app.post('/channel/:id/broadcast', controller.sendBroadcastAction);
};

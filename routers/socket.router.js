var controller = require('../controllers/socket.controller');

module.exports = (app) => {
    // controller.init(app, io, config);
	app.get('/socket.io', controller.handleXhrAction);
};
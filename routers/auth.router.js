var controller = require('../controllers/auth.controller');

module.exports = (app, config) => {
    controller.init(app, config);
	app.post('/auth', controller.authenticateAction);
	app.post('/create', controller.createAction);
};
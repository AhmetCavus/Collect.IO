var controller = require('../controllers/device.controller');

module.exports = (app) => {
	app.get('/device', controller.getDevicesAction);
	app.get('/device/checkin', controller.checkInAction);
};

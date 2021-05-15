var controller = require('../controllers/receipt.controller');

module.exports = (app) => {
	app.get('/receipt', controller.getReceiptsAction);
	app.post('/receipt', controller.createReceiptAction);
};

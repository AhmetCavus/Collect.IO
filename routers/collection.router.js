var controller = require('../controllers/collection.controller');

module.exports = (app) => {
	app.get('/collection/:schema/:relations', controller.getCollectionAction);
    app.get('/collection/:schema', controller.getCollectionAction);
    app.put('/collection/:schema', controller.updateCollectAction);
    app.post('/collection/:schema', controller.createCollectItemAction);
    app.put('/collection/:schema/:id', controller.updateCollectItemAction);
    app.delete('/collection/:schema/:id', controller.removeCollectionItemAction);
};

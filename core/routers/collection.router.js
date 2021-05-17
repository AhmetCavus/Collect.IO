const router = require("express").Router()
const controller = require('../controllers/collection.controller');

router.get('/:schema/:relations', controller.getCollectionAction);
router.get('/:schema', controller.getCollectionAction);
router.put('/:schema', controller.updateCollectAction);
router.post('/:schema', controller.createCollectItemAction);
router.put('/:schema/:id', controller.updateCollectItemAction);
router.delete('/:schema/:id', controller.removeCollectionItemAction);

module.exports = router
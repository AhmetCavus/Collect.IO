var controller = require("../controllers/asset.controller");

module.exports = (app) => {
	app.get("/asset/:assetType", controller.getAssetsAction);
	app.delete("/asset/:assetType/:assetName", controller.removeAssetAction);
	app.post("/asset/:assetName", controller.createAssetAction);
};

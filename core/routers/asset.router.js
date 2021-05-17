const router = require("express").Router()
const controller = require("../controllers/asset.controller")

router.get("/:assetType", controller.getAssetsAction)
router.delete("/:assetType/:assetName", controller.removeAssetAction)
router.post("/:assetName", controller.createAssetAction)

module.exports = router

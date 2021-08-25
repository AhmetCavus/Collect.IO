const path = require("path")
const CollectIO = require("../core/collectio.app")
const collectio = new CollectIO.App()

collectio.start({adminPort: 8181, updatePath: "./../updates", autoUpdate: true, modelPath: path.join(require.main.path, "models")}).then(() => {
  console.log("Collectio is up and running")

  collectio.config((app, express) => {
    app.get("/test", async (req, res) => {
      const device = collectio.collection("device")
      const result = await device.model.find()
      res.status(200).json(result)
    })
  })
})

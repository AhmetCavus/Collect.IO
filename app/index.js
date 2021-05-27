const path = require("path")
const CollectIO = require("../core/collectio.app")
const collectio = new CollectIO.App()

collectio.start({adminPort: 8181, updatePath: "./../updates", autoUpdate: true}).then(() => {
  console.log("Collectio is up and running")

  collectio.config((app, express) => {
    app.get("/test", (req, res) => {
      const device = collectio.collection("device")
      res.status(200).json(device.model)
    })
  })
})

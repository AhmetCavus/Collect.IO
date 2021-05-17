const CollectIO = require("../core/collectio.app")
const collectio = new CollectIO.App()

collectio.start({adminPort: 7070}).then(() => {
  console.log("Collectio is up and running")

  collectio.config((app, express) => {
    app.get("/test", (req, res) => {
      res.sendFile(__dirname + "/core/public/index.html")
    })
  })
})

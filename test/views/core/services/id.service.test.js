const idService = require("./../../../../core/services/id.service")

const chai = require("chai")
chai.use(require("chai-string"))

const faker = require("faker")

describe("IdService", () => {
  describe("#generate", () => {
    it("should generate uuids", () => {
        const prefix = faker.name.prefix()
        const uuid = idService.generate(prefix)
        chai.assert.containIgnoreCase(uuid, prefix)
    })
  })
})

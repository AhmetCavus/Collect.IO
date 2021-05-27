const fs = require("fs-extra")
const path = require("path")
const _ = require("lodash")

class SchemaService {
  async resolveCollections(sourceOfCollections) {
    const collectionFiles = await this.resolveCollectionFiles(
      sourceOfCollections
    )
    const collections = this.requireCollections(
      sourceOfCollections,
      collectionFiles
    )
    return collections
  }

  resolveCollectionFiles = async sourceOfCollections => {
    const allFiles = await fs.readdir(sourceOfCollections)
    return allFiles.filter(file => file.endsWith(".js"))
  }

  requireCollections = (sourceOfCollections, collectionFiles) => {
    const collections = []
    collectionFiles.forEach(fileName => {
      collections.push({ instance: require(path.join(sourceOfCollections, fileName)), name: fileName.replace(".js", "")})
    })
    return collections
  }

}

module.exports = SchemaService

const path = require("path")

class PathService {
    resolveRootDir() {
        return path.dirname(require.main.filename)                
    }

    resolvePreviousDir() {
        return path.dirname(__dirname)
    }

    resolvePreviousDir(dirname) {
        return path.dirname(dirname)
    }
}

module.exports = new PathService()
const TIME_TO_WAIT = 5000;

class DbManager {
	constructor() {
		this.dbService = require("./mongoService")()
	}

	init(options) {
		return new Promise((resolve, reject) => {
			if(options.autoStart) dbService.startDb()
			setTimeout(async () => {
				try {
					await this.dbService.connectToDb()
					resolve({ success: true })
				} catch (error) {
					// The db has to be initialized first
					// if it starts for the first time. 
					if(error.constructor.name === "MongooseError") {
						try {
							await this.dbService.initDb()
							await this.dbService.connectToDb()
							resolve({ success: true })
						} catch (innerError) {
							reject(innerError)
						}
					}
					else {
						reject(error)
					}
				}
			}, TIME_TO_WAIT)
		});
	}
}

module.exports = new DbManager()

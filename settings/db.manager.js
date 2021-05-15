const dbService = require("../services/db/mongoService")();
const delay = (time) => new Promise((res) => setTimeout(res, time));
const TIME_TO_WAIT = 5000;

class DbManager {
	constructor(app, express) {
		this._app = app;
		this._express = express;
	}

	init() {
		return new Promise((resolve, reject) => {
			if(process.env.DB_AUTO_SERVER === 'true') dbService.startDb();
			setTimeout(async () => {
				try {
					await dbService.connectToDb();
					resolve({ success: true });
				} catch (error) {
					// The db has to be initialized first
					// if it starts for the first time. 
					if(error.constructor.name === "MongooseError") {
						try {
							await dbService.initDb();
							await dbService.connectToDb();
							resolve({ success: true });
						} catch (innerError) {
							reject(innerError);
						}
					}
					else {
						reject(error);
					}
				}
			}, TIME_TO_WAIT);
		});
	}
}

var dbManager;
module.exports = (app, express) => {
	if (!dbManager) dbManager = new DbManager(app, express);
	return dbManager;
};

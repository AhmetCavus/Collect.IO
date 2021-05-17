"use strict";

const { exception } = require("console");

class CollectioApp {
	constructor() {
		require("dotenv").config()
		this.express = require("express")
		this.app = this.express()
		this.appConf = require("./settings/app.conf")(this.app, this.express)
		this.dbManager = require("./services/db/db.manager")
		this.keystone = require("keystone-nestedlist")
		this.keystoneConf = require("./settings/keystone.conf")(this.keystone)
		module.exports.instance = this
	}

	async start(options) {
		const dbResult = await this.dbManager.init(options)
		// Only if the database could be startet without any issues, than go forward with the app
		if (dbResult.success) {
			const restAuthMiddleware = require("./middleware/rest.auth")
			const signAuthMiddleware = require("./middleware/sign.auth")
			
			this.appConf.init()
			this.keystoneConf.init(options)
			this.keystone.start()

			this.app.use("/", restAuthMiddleware, require("./routers/root.router"))
			this.app.use("/auth", require("./routers/auth.router"))
			this.app.use("/channel", signAuthMiddleware, require("./routers/channel.router"))
			this.app.use("/collection", signAuthMiddleware, require("./routers/collection.router"))
			this.app.use("/asset", signAuthMiddleware, require("./routers/asset.router"))

			const http = require("http");
			const server = http
				.createServer(this.app)
				.listen(options.restPort || 8080);

			this.pubSubService = require("./services/connection/pubSubService")();
			this.pubSubService.init(server);
		} else {
			throw new exception(dbResult.error)
		}
	}

	config(callback) {
		callback(this.app, this.express)
	}
}

module.exports.App = CollectioApp
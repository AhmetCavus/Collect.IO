"use strict";

require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express();
const appConf = require("./settings/app.conf")(app, express);
const dbManager = require("./settings/db.manager")(app, express);

// First start the database before executing the application
dbManager
	.init()
	.then((result) => {
		// Only if the database could be startet without any issues, than go forward with the app
		if (result.success) {
			appConf.init();

			const keystone = require("keystone-nestedlist");
			const keystoneConf = require("./settings/keystone.conf")(keystone);

			keystoneConf.init();
			keystone.start();

			var server = http
				.createServer(app, (req, res) => {
					console.log(process.env.FIRST_START_LOG + process.env.REST_PORT);
				})
				.listen(process.env.REST_PORT);

			var pubSubService = require("./services/connection/pubSubService")();
			pubSubService.init(server);

			require("./routers/root.router")(app);
			require("./routers/auth.router")(app);
			require("./routers/channel.router")(app);
			require("./routers/device.router")(app);
			require("./routers/collection.router")(app);
			require("./routers/socket.router")(app);
			require("./routers/asset.router")(app);
		} else {
			console.log(result);
		}
	})
	.catch((ex) => {
		console.log(ex);
	});

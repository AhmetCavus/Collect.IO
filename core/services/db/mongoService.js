const TIME_TO_WAIT = 5000;
const f = require("util").format;
const jwt = require("jsonwebtoken");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const mongoose = require("mongoose");
const MAX_CONN_TRY = 2;

class CollectMongo {
	constructor(config) {
		this.config = config;
		this.tag = "collectmongo";
		this.rootConnection = {};
		this.connections = {};
		this.models = {};
		this.tries = 0;
	}

	// #region Public Methods

	/**
	 * @deprecated
	 */
	init() {
		this.rootUrl = f(
			"mongodb://%s:%s@%s:%d/%s?authSource=admin",
			this.config.db.user,
			this.config.db.pass,
			this.config.db.url,
			this.config.db.port,
			this.config.db.channel
		);
		mongoose.connect(this.rootUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		initListener();
	}

	/**
	 * @deprecated
	 */
	auth(clientId, secretId, channel, success, fail) {
		var url = f(
			"mongodb://%s:%s@%s:%d/%s/ps?authSource=admin",
			clientId,
			secretId,
			this.config.db.url,
			this.config.db.port,
			channel
		);
		var conn = mongoose.createConnection(url);
		conn.on("error", (err) => {
			if (fail) fail(err);
		});
		conn.once("open", (data) => {
			var key = { clientId: clientId, channel: channel };
			if (success) success(key);
			this.connections[JSON.stringify(key)] = conn;
		});
	}

	/**
	 * @deprecated
	 */
	create(clientId, secretId, channel, success, fail) {
		var url = f(
			"mongodb://%s:%s@%s:%d/%s",
			clientId,
			secretId,
			this.config.db.url,
			this.config.db.port,
			channel
		);
		var conn = mongoose.createConnection(url);
		conn.on("error", (err) => {
			var options = {
				roles: [
					{
						role: "readWrite",
						db: channel,
					},
				],
			};
			this.rootConnection.db.addUser(
				clientId,
				secretId,
				options,
				(err, res) => {
					console.log(res);
					if (err) {
						if (fail) fail(err);
					} else {
						if (success) success(res);
					}
				}
			);
		});
		conn.once("open", (data) => {
			conn.close();
			if (fail)
				fail({
					success: false,
					error: {
						name: "Duplicate",
						message: "The account already exists",
						ok: 0,
						code: 18,
						errmsg: "The account already exists",
					},
				});
		});
	}

	getCollection(socket, name, success, error) {
		var Model;
		try {
			var Schema = mongoose.Schema({ id: Number, name: String, email: String });
			var key = JSON.stringify(
				jwt.decode(socket.handshake.query.token).profile
			);
			var conn = this.connections[key];
			if (!conn.models[name]) {
				Model = conn.model(name, Schema);
			} else {
				Model = conn.models[name];
			}
			Model.find((err, data) => {
				if (err) error(err);
				else success(data);
			});
		} catch (err) {
			error(err);
			console.log(err);
		}
	}

	createConnectionStringWithAuth() {
		return process.env.MONGO_URI
	}

	createConnectionString() {
		return process.env.MONGO_URI.parse("@")[1].parse("/")[0] + "/admin"
	}

	startDb() {
		return exec("npm run db");
	}

	async connectToDb() {
		const connectionString = this.createConnectionStringWithAuth();
		return await mongoose.connect(connectionString, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	}

	async initDb() {
		const connectionString = this.createConnectionString();
		await mongoose.connect(connectionString, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Initializing db. Please wait...");
		const credentails = gainCredentials()
		await mongoose.connection.db.addUser(credentails[0], credentails[1], {
			roles: [
				{ role: "userAdminAnyDatabase", db: "admin" },
				{ role: "readWriteAnyDatabase", db: "admin" },
			],
		});
		return await mongoose.connection.close();
	}

	// #endregion

	// #region Private Methods

	initListener() {
		this.rootConnection = mongoose.connection;
		this.rootConnection.on("error", onRootDbError);
		this.rootConnection.once("open", onRootDbConnected);
	}

	handleReconnectRequest() {
		if (tries < MAX_CONN_TRY) {
			tries += 1;
			reconnect();
		} else {
			tries = 0;
			start();
		}
	}

	reconnect() {
		var res = this.db.open(this.rootUrl);
		console.log(this.db._readyState);
	}

	// #endregion

	// #region Event Handler

	onRootDbConnected(db) {
		console.log("Db is running: " + db);
		console.log(this.rootConnection._readyState);
	}

	onRootDbDisconnected(obj) {
		console.log("Db is closing: " + obj);
	}

	onRootDbError(err) {
		console.log("Db error: " + err);
		console.log(this.tag, "Retry connection attempt");
		setTimeout(handleReconnectRequest, TIME_TO_WAIT);
	}

	onClientDbConnected(db) {
		console.log("Db is running: " + db);
	}

	onClientDbError(err, db) {
		console.log("Db error: " + err);
	}

	gainCredentials() {
		return process.env.MONGO_URI.parse("@")[0].replace("mongodb://").parse(":")
	}

	// #endregion
}

module.exports = config => new CollectMongo(config)

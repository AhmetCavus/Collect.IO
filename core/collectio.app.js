"use strict";

const { exception } = require("console");
const path = require("path")
const _ = require("lodash")
const SchemaService = require("./services/db/schema.service");
const Collection = require("./collection");
const checkIfEnvVariablesSet = Symbol("checkIfEnvVariablesSet")
const ensureAtLeastOneAdminExists = Symbol("ensureAtLeastOneAdminExists")
const ensureInitialization = Symbol("ensureInitialization")

class CollectioApp {
	constructor() {
		require("dotenv").config()
		this.express = require("express")
		this.app = this.express()
		this.appConf = require("./settings/app.conf")(this.app, this.express)
		this.dbManager = require("./services/db/db.manager")
		this.keystone = require("keystone-nestedlist")
		this.keystoneConf = require("./settings/keystone.conf")(this.keystone)
		this.schemaService = new SchemaService()
		this.collections = []
		module.exports.instance = this
	}

	async start(options) {
		this[checkIfEnvVariablesSet]()
		await this[ensureInitialization](options)
		await this[ensureAtLeastOneAdminExists]()
	}

	config(callback) {
		callback(this.app, this.express)
	}

	/**
   * @description Resolves the collection regarding to the given name.
   * @param {string} name - The name of the collection that should be resolved.
   * @returns {Collection} the found collection matches to the given name.
   */
	collection(name) {
	return _.findLast(
		this.collections,
		o => _.toLower(o.name) === _.toLower(name)
	)
	}

	[checkIfEnvVariablesSet]() {
		if(!process.env.MONGO_URI) {
			throw new exception('No MONGO_URI provided as env variable')
		}

		if(!process.env.JWT_SECRET) {
			throw new exception('No JWT_SECRET provided as env variable')
		}

		if(!process.env.CLIENT_ID) {
			throw new exception('No CLIENT_ID provided as env variable')
		}

		if(!process.env.SECRET_ID) {
			throw new exception('No SECRET_ID provided as env variable')
		}
	}

	async [ensureAtLeastOneAdminExists]() {
		const collectionRepo = require("./repositories/collection.repository")
		const adminList = await collectionRepo.getCollection("Admin", "")
		if(!adminList || adminList.length <= 0) {
			const result = await collectionRepo.addItem("Admin", {
				name: { first: "collect", last: "io" },
				email: "admin@collectio.com",
				password: "admin"
			})
			if(!result.success) throw new exception(result.message)
		}
	}

	async [ensureInitialization](options) {
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

			this.pubSubService = require("./services/connection/pubSubService")
			this.pubSubService.init(server)
			
			var models = []
			var coreModels = await this.schemaService.resolveCollections(path.join(__dirname, "models"))
			if(options.modelPath) {
				const projectModels = await this.schemaService.resolveCollections(options.modelPath)
				models = [...coreModels, ...projectModels]
			}
			models.forEach(model => {
				const newCollect = new Collection(model)
				newCollect.activateChannel()
				this.collections.push(newCollect)
			})
			
		} else {
			throw new exception(dbResult.error)
		}
	}
}

module.exports.App = CollectioApp
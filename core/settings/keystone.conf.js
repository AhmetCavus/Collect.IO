const handlebars = require("express-handlebars");

class KeystoneConfigurator {
	constructor(keystone) {
		this._keystone = keystone;
	}

	init(options) {
		// Initialise Keystone with your project's configuration.
		// See http://keystonejs.com/guide/config for available options
		// and documentation.
		if(options.init) {
			this._keystone.init(options.init)
		} else {
			this._keystone.init({
				name: "Collect.IO",
				brand: "Collect.IO",
				sass: "public",
				static: "public",
				updates: options.updatePath ?? "../updates",
				views: "templates/views",
				"view engine": ".hbs",
				"wysiwyg skin": "lightgray",
				"custom engine": handlebars.create({
					layoutsDir: "core/templates/views/layouts",
					partialsDir: "core/templates/views/partials",
					defaultLayout: "default",
					helpers: new require("../templates/views/helpers")(),
					extname: ".hbs",
				}).engine,
				emails: "../templates/emails",
				"auto update": options.autoUpdate ?? false,
				session: true,
				auth: true,
				"user model": "Admin",
			});
		}

		// optional, will prefix all built-in tags with 'keystone_'
		// keystone.set('cloudinary prefix', 'collectio');

		if(process.env.CLOUDINARY_API_SECRET) {
			this._keystone.set("cloudinary config", {
				cloud_name: process.env.CLOUDINARY_NAME,
				api_key: process.env.API_KEY,
				api_secret: process.env.CLOUDINARY_API_SECRET,
			});

			// optional, will prefix each image public_id with [{prefix}]/{list.path}/{field.path}/
			//keystone.set('cloudinary folders', true);

			// optional, will force cloudinary to serve images over https
			this._keystone.set("cloudinary secure", true);
		}

		this._keystone.set("signin logo", "cinarsoft.logo.png");

		this._keystone.set("mongo options", { useMongoClient: true });

		// Load your project's Models
		this._keystone.import("models")

		if(options.modelPath) {
			this._keystone.import(options.modelPath)
		}

		if(options.adminPort) {
			this._keystone.set("port", options.adminPort)
		}

		// Setup common locals for your templates. The following are required for the
		// bundled templates and layouts. Any runtime locals (that should be set uniquely
		// for each request) should be added to ./routes/middleware.js
		this._keystone.set("locals", {
			_: require("lodash"),
			env: this._keystone.get("env"),
			utils: this._keystone.utils,
			editable: this._keystone.content.editable,
		});

		// Load your project's Routes
		this._keystone.set("routes", require("../../routes"));

		// Configure the navigation bar in Keystone's Admin UI
		//keystone.set('nav', {
		//	posts: ['posts', 'post-categories'],
		//	galleries: 'galleries',
		//	enquiries: 'enquiries',
		//	'cio-admins': 'cio-admins',
		//});

		if(options.nav) {
			this._keystone.set("nav", options.nav)
		} else {
			this._keystone.set("nav", {
				account: ["admins", "clients", "roles"],
			})
		}


		// Start Keystone to connect to your database and initialise the web server

		// if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
		//     console.log('----------------------------------------' +
		//         '\nWARNING: MISSING MAILGUN CREDENTIALS' +
		//         '\n----------------------------------------' +
		//         '\nYou have opted into email sending but have not provided' +
		//         '\nmailgun credentials. Attempts to send will fail.' +
		//         '\n\nCreate a mailgun account and add the credentials to the .env file to' +
		//         '\nset up your mailgun integration');
		// }
	}
}

module.exports = keystone => new KeystoneConfigurator(keystone) 

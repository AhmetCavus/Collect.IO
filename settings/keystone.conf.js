const handlebars = require("express-handlebars");
const hbs = require("hbs");

class KeystoneConfigurator {
	constructor(keystone) {
		this._keystone = keystone;
	}

	init() {
		// Initialise Keystone with your project's configuration.
		// See http://keystonejs.com/guide/config for available options
		// and documentation.
		this._keystone.init({
			name: "Collect.IO",
			brand: "Collect.IO",
			sass: "public",
			static: "public",
			favicon: "public/favicon.ico",
			views: "templates/views",
			"view engine": ".hbs",
			"wysiwyg skin": "lightgray",
			"custom engine": handlebars.create({
				layoutsDir: "templates/views/layouts",
				partialsDir: "templates/views/partials",
				defaultLayout: "default",
				helpers: new require("../templates/views/helpers")(),
				extname: ".hbs",
			}).engine,

			emails: "templates/emails",

			"auto update": true,
			session: true,
			auth: true,
			"user model": "Admin",
		});

		// optional, will prefix all built-in tags with 'keystone_'
		// keystone.set('cloudinary prefix', 'collectio');

		this._keystone.set("cloudinary config", {
			cloud_name: process.env.CLOUDINARY_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
		});

		// optional, will prefix each image public_id with [{prefix}]/{list.path}/{field.path}/
		//keystone.set('cloudinary folders', true);

		// optional, will force cloudinary to serve images over https
		this._keystone.set("cloudinary secure", true);

		this._keystone.set("signin logo", "keystone.png");

		this._keystone.set("mongo options", { useMongoClient: true });

		// Load your project's Models
		this._keystone.import("models");

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
		this._keystone.set("routes", require("../routes"));

		// Configure the navigation bar in Keystone's Admin UI
		//keystone.set('nav', {
		//	posts: ['posts', 'post-categories'],
		//	galleries: 'galleries',
		//	enquiries: 'enquiries',
		//	'cio-admins': 'cio-admins',
		//});

		this._keystone.set("nav", {
			account: ["admins", "clients"],
			trading: ["trade-items", "trade-categories"],
		});

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

var keystoneConf;
module.exports = (keystone) => {
	if (!keystoneConf) keystoneConf = new KeystoneConfigurator(keystone);
	return keystoneConf;
};

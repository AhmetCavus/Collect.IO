var keystone = require("keystone-nestedlist");
var Types = keystone.Field.Types;

/**
 * Client Model
 * ==========
 */
var Client = new keystone.List("Client", {
	autokey: { from: "name email", path: "key", unique: true },
});

Client.add({
	name: { type: Types.Name, index: true },
	email: {
		type: Types.Email,
		initial: true,
		required: true,
		unique: true,
		index: true,
	},
	password: { type: Types.Password, initial: true, required: true },
	role: { type: Types.Relationship, ref: "Role", initial: true, require: true },
	isOnline: { type: Boolean, initial: false, noedit: true },
	connectedSince: {
		type: Types.Datetime,
		default: new Date("0001-01-01"),
		noedit: true,
	},
	createdAt: { type: Types.Datetime, default: Date.now, noedit: true },
});

// Client.schema.post('save', function(next) {
// socketService.notifyCollectionAddItem('collect', { schema: 'Client' });
// });

/**
 * Relationships
 */

/**
 * Registration
 */
Client.defaultColumns = "name, email, mode"
Client.register()

module.exports = Client

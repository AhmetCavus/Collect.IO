var keystone = require("keystone-nestedlist");
var Types = keystone.Field.Types;

/**
 * Role Model
 * ==========
 */
var Role = new keystone.List("Role", {
	autokey: { from: "name", path: "key", unique: true },
});

Role.add({
	name: { type: Types.Text, index: true },
	read: { type: Boolean },
	write: { type: Boolean },
	delete: { type: Boolean },
	update: { type: Boolean },
	createdAt: { type: Types.Datetime, default: Date.now, noedit: true },
});

// Role.schema.post('save', function(next) {
// socketService.notifyCollectionAddItem('collect', { schema: 'Client' });
// });

/**
 * Relationships
 */

/**
 * Registration
 */
Role.defaultColumns = "name, read, write, delete, update"
Role.register()

module.exports = Role

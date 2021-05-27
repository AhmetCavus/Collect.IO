var keystone = require("keystone-nestedlist");
var Types = keystone.Field.Types;

/**
 * Device Model
 * ==========
 */
var Device = new keystone.List("Device", {
	autokey: { from: "name deviceId", path: "key", unique: true },
});

Device.add({
	name: { type: Types.Text, index: true, unique: true },
	label: { type: Types.Text, index: true },
	deviceId: {
		type: Types.Text,
		initial: true,
		required: true,
		unique: true,
		index: true,
	},
	ip: { type: Types.Text },
	operatingSystem: { type: Types.Text },
	createdAt: { type: Types.Datetime, default: Date.now, noedit: true },
});

Device.schema.post("save", function (next) {
	// socketService.notifyCollectionAddItem('collect', { schema: 'Client' });
});

/**
 * Relationships
 */

/**
 * Registration
 */
Device.defaultColumns = "name, deviceId, ip, operatingSystem";
Device.register();

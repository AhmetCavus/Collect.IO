﻿const keystone = require("keystone-nestedlist");
const Types = keystone.Field.Types;

/**
 * Admin Model
 * ==========
 */
const Admin = new keystone.List("Admin", {
	autokey: { from: "name email", path: "key", unique: true },
});

Admin.add(
	{
		name: { type: Types.Name, required: true, index: true },
		email: {
			type: Types.Email,
			initial: true,
			required: true,
			unique: true,
			index: true,
		},
		password: { type: Types.Password, initial: true, required: true },
		createdAt: { type: Types.Datetime, default: Date.now, noedit: true },
	},
	"Permissions",
	{
		isAdmin: { type: Boolean, label: "Can access Keystone", index: true },
	}
);

// Provide access to Keystone
Admin.schema.virtual("canAccessKeystone").get(function () {
	return this.isAdmin;
});

/**
 * Registration
 */
Admin.defaultColumns = "name, email, isAdmin"
Admin.register()

module.exports = Admin

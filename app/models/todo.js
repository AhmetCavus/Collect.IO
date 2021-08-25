const keystone = require("keystone-nestedlist");
const Types = keystone.Field.Types;

/**
 * Todo Model
 * ==========
 */

 const Task = new keystone.List("Task");

 Task.add({
    name: { type: Types.Text },
    task: { type: Types.Text },
    createdAt: { type: Types.Datetime, default: Date.now, noedit: true },
    dueDate: { type: Types.Datetime, default: Date.now },
    completed: { type: Boolean }
 });
 

const Todo = new keystone.List("Todo");

Todo.add({
	title: { type: Types.Text },
    completed: { type: Boolean },
	tasks: {
		type: Types.List,
		fields: {
            name: { type: Types.Text },
            task: { type: Types.Text },
            createdAt: { type: Types.Datetime, default: Date.now, noedit: true },
            dueDate: { type: Types.Datetime, default: Date.now },
            completed: { type: Boolean }
		},
	},
	device: { type: Types.Relationship, ref: "Device", require: true },
	client: { type: Types.Relationship, ref: "Client", require: true },
	createdAt: { type: Types.Datetime, default: Date.now, noedit: true },
});

Todo.schema.add({
	tasks: [Task.schema],
});

// For whatever reason here you cannot use the arrow syntax if you want
// to get a reference to the current item to be saved.
// Thus we use the conventional syntax!
Todo.schema.pre("save", function (next, done) {
	this.isUpdate = !this.isNew;
	next();
});

/**
 * Relationships
 */

/**
 * Registration
 */
 Todo.defaultColumns = "name, device, client, date, total";
 Todo.register()

 module.exports = Todo

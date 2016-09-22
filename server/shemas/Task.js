import mongoose from 'mongoose';

let taskSchema = mongoose.Schema({

	title: {

		type: String,
		default: ''

	},

	text: {

		type: String,
		default: ''

	},

	created_at: {

		type: Date,
		default: ''

	},

	userId: {

		type: String,
		default: ''

	}

}, { versionKey: false });

export default mongoose.model('task', taskSchema);

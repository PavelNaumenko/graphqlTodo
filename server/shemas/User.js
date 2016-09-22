import mongoose from 'mongoose';

let userSchema = mongoose.Schema({

	name: {

		type: String,
		default: ''

	},

	email: {

		type: String,
		default: ''

	}

}, { versionKey: false });

export default mongoose.model('user', userSchema);

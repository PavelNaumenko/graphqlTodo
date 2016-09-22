import { userSchema, taskSchema } from '../shemas';

export default class dbDriver {

	constructor(model) {

		switch (model) {

			case 'userModel':
				this.model = userSchema;
				break;

			case 'taskModel':
				this.model = taskSchema;
				break;

			default:
				console.log('Incorrect model!');


		}

	}

	readAll() {

		return new Promise((resolve, reject) => {

			this.model.find((err, data) => {

				(err) ? reject(err) : resolve(data);

			});

		});

	}

	readOne(criteria) {

		return new Promise((resolve, reject) => {

			this.model.findOne(criteria, (err, data) => {

				(err) ? reject(err) : resolve(data);

			});

		});
		
	}

	readByCriteria(criteria) {

		return new Promise((resolve, reject) => {

			this.model.find(criteria, (err, user) => {

				(err) ? reject(err) : resolve(user);

			});

		});

	}

	createField(data) {

		return new Promise((resolve, reject) => {
            
			if (data !== '') {

				this.model.create(data, (err, data) => {

					(err) ? reject(err) : resolve(data);

				});

			} else {

				reject({ message: 'empty data' });

			}

		});

	}

	updateField(criteria, data, options) {

		return new Promise((resolve, reject) => {

			if (data !== '') {

				this.model.findOneAndUpdate(criteria, data, options, (err, data) => {

					(err) ? reject(err) : resolve(data);

				});

			} else {

				reject('Try to update user with empty params');

			}

		});

	}

	deleteField(criteria) {

		return new Promise((resolve, reject) => {

			this.model.findOneAndRemove(criteria, (err, data) => {

				(err) ? reject(err) : resolve(data);

			});

		});

	}

	deleteByCriteria(criteria) {

		return new Promise((resolve, reject) => {

			this.model.remove(criteria, (err, data) => {

				(err) ? reject(err) : resolve(data);

			});

		});

	}

}

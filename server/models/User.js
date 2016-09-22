import dbDriver from '../driver/dbDriver';
import TaskModel from './Task';

const userDriver = new dbDriver('userModel');

class User {

	getAll() {

		return new Promise((resolve, reject) => {

			userDriver.readAll()
				.then((users) => {

					resolve(users);

				})
				.catch((error) => {

					reject({ error });

				});

		});

	}

	getOne(criteria) {

		return new Promise((resolve, reject) => {

			userDriver.readOne(criteria)
				.then((user) => {

					resolve(user);

				})
				.catch((error) => {

					reject({ error });

				});

		});

	}

	create(data) {

		return new Promise((resolve, reject) => {

			userDriver.createField(data)
				.then((user) => {

					resolve(user);

				})
				.catch((error) => {

					reject({ error });

				});

		});

	}

	update(filter, data) {

		return new Promise((resolve, reject) => {

			userDriver.updateField(filter, data, { new: true })
				.then((user) => {

					resolve(user);

				})
				.catch((error) => {

					reject({ error });

				});

		});

	}

	delete(filter) {

		return new Promise((resolve, reject) => {

			TaskModel.deleteByUserId({ userId: filter._id })
				.then(() => {
					
					return userDriver.deleteField(filter);
					
				})
				.then((user) => {

					resolve(user);
					
				})
				.catch((error) => {

					reject({ error });

				});
			
		});

	}

}

export default new User();

import dbDriver from '../driver/dbDriver';
import UserModel from './User';

const taskDriver = new dbDriver('taskModel');

class Task {

	getOne(criteria) {

		return new Promise((resolve, reject) => {

			taskDriver.readByCriteria(criteria)
				.then((task) => {

					resolve(task);

				})
				.catch((error) => {

					reject({ error });

				});

		});

	}

	create(data) {

		return new Promise((resolve, reject) => {

			UserModel.getOne({ _id: data.userId })
				.then((user) => {

					return (user) ? taskDriver.createField(data) : reject('User does not exist');

				})
				.then((task) => {

					resolve(task);

				})
				.catch((error) => {

					reject(error);

				});

		});

	}

	update(filter, data) {

		return new Promise((resolve, reject) => {

			taskDriver.updateField(filter, data, { new: true })
				.then((task) => {

					resolve(task);

				})
				.catch((error) => {

					reject({ error });

				});

		});

	}

	delete(filter) {

		return new Promise((resolve, reject) => {

			taskDriver.deleteField(filter)
				.then((task) => {

					resolve(task);

				})
				.catch((error) => {

					reject({ error });

				});

		});

	}

	deleteByUserId(criteria) {

		return new Promise((resolve, reject) => {

			taskDriver.deleteByCriteria(criteria)
				.then((task) => {

					resolve(task);

				})
				.catch((error) => {

					reject({ error });

				});

		});

	}

}

export default new Task();


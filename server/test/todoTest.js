import { expect } from 'chai';
import { graphql } from 'graphql';
import TodoSchema from '../state/schema';
import fetch from 'node-fetch';
import config from 'config';
import mongoose from 'mongoose';

before((done) => {

	mongoose.connect(config['development'].DATABASE, (error) => {

		if (error) {

			console.log(`Error: ${error}`);
			done(error);

		} else {

			console.log('//        Connected to API db        //');
			done();

		}

	});

});

describe('User test', () => {

	let userId;

	describe('#create()', () => {

		let query = `
				mutation insertUser {
				  user: createUser(
					name: "Den",
					email: "den@gmail.com"
				  )  {
					_id
					name
					email
					tasks {
					  title,
					  text,
					  created_at
					}
				  }
				}
			`;
		let user;

		before((done) => {

			graphql(TodoSchema, query).then((result) => {

				user = result.data.user;

				userId = user._id;

				done();

			}).catch((err) => {

				done(err);

			});

		});

		it('should return data of created user', (done) => {

			expect(user).to.be.an('object')
				.with.property('name')
				.that.equals('Den');

			done();

		});

		it('should return empty task list', (done) => {

			expect(user).to.have.property('tasks')
				.that.to.be.a('array')
				.that.eql([]);

			done();

		});

		it('should return a error when try to create user without required fields', (done) => {

			let query = `
				mutation insertUser {
				  user: createUser(
					email: "den@gmail.com"
				  )  {
					_id
					name
					email
					tasks {
					  title,
					  text,
					  created_at
					}
				  }
				}
			`;

			graphql(TodoSchema, query).then((result) => {

				expect(result).to.have.property('errors');

				done();

			}).catch((err) => {

				done(err);

			});

		});

		it('should return a error when try to create user with unresolved fields', (done) => {

			let query = `
				mutation insertUser {
				  user: createUser(
					_id: "4",
					name: "Den",
					email: "den@gmail.com",
					some: 4
				  )  {
					_id
					name
					email
					tasks {
					  title,
					  text,
					  created_at
					}
				  }
				}
			`;

			graphql(TodoSchema, query).then((result) => {

				expect(result).to.have.property('errors');

				done();

			}).catch((err) => {

				done(err);

			});

		});

	});

	describe('#readAll()', () => {

		it('should return array of users', (done) => {

			let query = `
				{
				  users {
					_id,
					name,
					email,
					tasks {
					  _id
					  title,
					  text,
					  created_at
					}
				  }
				}     
			`;

			graphql(TodoSchema, query).then((result) => {

				expect(result.data.users).to.be.an('array');

				done();

			}).catch((err) => {

				done(err);

			});

		});

	});

	describe('#readOne()', () => {

		it('should return user', (done) => {

			let query = `
				{
				  user(_id: "${userId}") {
					_id,
					name,
					email,
					tasks {
					  _id
					  title,
					  text,
					  created_at
					}
				  }
				}
			`;

			graphql(TodoSchema, query).then((result) => {

				expect(result.data.user).to.be.an('object')
					.with.property('_id')
					.that.equals(userId);

				done();

			}).catch((err) => {

				done(err);

			});

		});

		it('should return null, when try to find user with id that does not exist', (done) => {

			let query = `
				{
				  user(_id: "7") {
					_id,
					name,
					email,
					tasks {
					  _id
					  title,
					  text,
					  created_at
					}
				  }
				}
			`;

			graphql(TodoSchema, query).then((result) => {

				expect(result.data.user).to.be.null;

				done();

			}).catch((err) => {

				done(err);

			});

		});

	});

	describe('#update()', () => {

		it('should update user', (done) => {

			let query = `
				mutation updateUser {
				  user: updateUser(
					_id: "${userId}",
					new_name: "Bob"
				  )  {
					name
					email
					tasks {
					  title,
					  text,
					  created_at
					}
				  }
				}
			`;

			graphql(TodoSchema, query).then((result) => {

				expect(result.data.user).to.be.an('object')
					.with.property('name')
					.that.equals('Bob');

				done();

			}).catch((err) => {

				done(err);

			});

		});

		it('should return error, when try to update user with id that does not exist', (done) => {

			let query = `
				mutation updateUser {
				  user: updateUser(
					_id: "7",
					new_name: "Bob"
				  )  {
					name
					email
					tasks {
					  title,
					  text,
					  created_at
					}
				  }
				}
			`;

			graphql(TodoSchema, query).then((result) => {

				expect(result).to.have.property('errors');

				done();

			}).catch((err) => {

				done(err);

			});

		});

	});

	describe('#delete()', () => {

		it('should delete user', (done) => {

			let query = `
				mutation deleteUser {
				  user: deleteUser(
					_id: "${userId}"
				  )  {
					name
					email
					tasks {
					  title,
					  text,
					  created_at
					}
				  }
				}
			`;

			graphql(TodoSchema, query).then((result) => {

				expect(result.data.user).to.be.an('object')
					.with.property('name')
					.that.equals('Bob');

				done();

			}).catch((err) => {

				done(err);

			});

		});

		it('should return error, when try to delete user with id that does not exist', (done) => {

			let query = `
				mutation deleteUser {
				  user: deleteUser(
					_id: "7"
				  )  {
					name
					email
					tasks {
					  title,
					  text,
					  created_at
					}
				  }
				}
			`;

			graphql(TodoSchema, query).then((result) => {

				expect(result).to.have.property('errors');

				done();

			}).catch((err) => {

				done(err);

			});

		});

	});

});

describe('Task test', () => {

	let taskId;

	describe('#create()', () => {

		it('should return data of created task', (done) => {

			let query = `
				mutation taskUser {
				  task: createTask(
					title: "Some",
					text: "Some text",
					userId: "57e2aa817c5edf71652912a9"
				  )  {
					_id,
					title,
					text,
					created_at,
					userId
				  }
				}
			`;

			graphql(TodoSchema, query).then((result) => {

				expect(result.data.task).to.be.an('object')
					.with.property('title')
					.that.equals('Some');

				taskId = result.data.task._id;

				done();

			}).catch((err) => {

				done(err);

			});

		});

	});

	describe('#update()', () => {

		it('should return data of updated task', (done) => {

			let query = `
				mutation taskUser {
				  task: updateTask(
					_id: "${taskId}",
					new_title: "New title"
				  )  {
					_id,
					title,
					text,
					created_at,
					userId
				  }
				}
			`;

			graphql(TodoSchema, query).then((result) => {

				expect(result.data.task).to.be.an('object')
					.with.property('title')
					.that.equals('New title');

				done();

			}).catch((err) => {

				done(err);

			});

		});

	});

	describe('#delete()', () => {

		it('should return data of deleted task', (done) => {

			let query = `
				mutation taskUser {
				  task: deleteTask(
					_id: "${taskId}"
				  )  {
					_id,
					title,
					text,
					created_at,
					userId
				  }
				}
			`;

			graphql(TodoSchema, query).then((result) => {

				expect(result.data.task).to.be.an('object')
					.with.property('_id')
					.that.equals(taskId);

				done();

			}).catch((err) => {

				done(err);

			});

		});

	});

});

describe('Request test', () => {

	describe('GET request', () => {
		
		it('should return users data', (done) => {
			
			fetch('http://localhost:8989/graphql?query={users{_id,name,email,tasks{_id,title,text,created_at}}}')
				.then((response) => {

					response.json().then((data) => {

						expect(data.data.users).to.be.an('array');

						done();

					});

				})
				.catch((error) => {

					done(error);

				});
			
		});

		it('should return user by id', (done) => {

			fetch('http://localhost:8989/graphql?query={user(_id: "57e2aa817c5edf71652912a9"){_id,name,email,tasks{_id,title,text,created_at}}}')
				.then((response) => {

					response.json().then((data) => {

						expect(data.data.user).to.be.an('object')
							.with.property('_id')
							.that.equals('57e2aa817c5edf71652912a9');

						done();

					});

				})
				.catch((error) => {

					done(error);

				});

		});

		it('should create user', (done) => {

			let name = 'Den';
			let email = 'den@gmail.com';

			let query = `insertUser{user: createUser(name: "${name}",email: "${email}"){_id name email tasks{title,text,created_at}}}`;

			fetch('http://localhost:8989/graphql', {

				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					query: `mutation ${query}`
				})
			})
				.then(response => {

					response.json().then(data => {

						expect(data.data.user).to.be.an('object')
							.with.property('name')
							.that.equals('Den');

						done();

					});

				})
				.catch((error) => {

					done(error);

				});

		});

	});

});

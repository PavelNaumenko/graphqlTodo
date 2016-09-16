import { expect } from 'chai';
import { graphql } from 'graphql';
import TodoSchema from '../state/schema';

describe('User test', () => {

	describe('#create()', () => {

		let query = `
				mutation insertUser {
				  user: createUser(
					id: "4",
					name: "Den",
					email: "den@gmail.com"
				  )  {
					id
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

				done();

			}).catch((err) => {

				done(err);

			});

		});

		it('should return data of created user', (done) => {

			expect(user).to.be.an('object')
				.with.property('id')
				.that.equals('4');

			done();

		});

		it('should return empty task list', (done) => {

			expect(user).to.have.property('tasks')
				.that.to.be.a('array')
				.that.eql([]);

			done();

		});

		it('should return a error when try create a existing user', (done) => {

			graphql(TodoSchema, query).then((result) => {

				expect(result).to.have.property('errors');

				done();

			}).catch((err) => {

				done(err);

			});

		});

		it('should return a error when try to create user without required fields', (done) => {

			let query = `
				mutation insertUser {
				  user: createUser(
					email: "den@gmail.com"
				  )  {
					id
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
					id: "4",
					name: "Den",
					email: "den@gmail.com",
					some: 4
				  )  {
					id
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
					id,
					name,
					email,
					tasks {
					  id
					  title,
					  text,
					  created_at
					}
				  }
				}            
			`;

			graphql(TodoSchema, query).then((result) => {

				expect(result.data.users).to.be.an('array')
					.and.to.have.lengthOf(4);

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
				  user(id: "4") {
					id,
					name,
					email,
					tasks {
					  id
					  title,
					  text,
					  created_at
					}
				  }
				}
			`;

			graphql(TodoSchema, query).then((result) => {

				expect(result.data.user).to.be.an('object')
					.with.property('id')
					.that.equals('4');

				done();

			}).catch((err) => {

				done(err);

			});

		});

		it('should return null, when try to find user with id that does not exist', (done) => {

			let query = `
				{
				  user(id: "7") {
					id,
					name,
					email,
					tasks {
					  id
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
					id: "4",
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
					id: "7",
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
					id: "4"
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
					id: "7"
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

	describe('#create()', () => {

		it('should return data of created task', (done) => {

			let query = `
				mutation taskUser {
				  task: createTask(
					id: "5",
					title: "Some",
					text: "Some text",
					userId: "2"
				  )  {
					id,
					title,
					text,
					created_at,
					userId
				  }
				}
			`;

			graphql(TodoSchema, query).then((result) => {

				expect(result.data.task).to.be.an('object')
					.with.property('id')
					.that.equals('5');

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
					id: "5",
					new_title: "New title"
				  )  {
					id,
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
					id: "5"
				  )  {
					id,
					title,
					text,
					created_at,
					userId
				  }
				}
			`;

			graphql(TodoSchema, query).then((result) => {

				expect(result.data.task).to.be.an('object')
					.with.property('id')
					.that.equals('5');

				done();

			}).catch((err) => {

				done(err);

			});

		});

	});

});

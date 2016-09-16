import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull
} from 'graphql';

import { User, Task } from '../types';
import { UserList, TaskList } from '../data';

const Mutation = new GraphQLObjectType({

	name: 'ToDoMutations',
	description: 'Mutations of our todo',
	fields: () => ({

		createUser: {
			type: User,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) },
				name: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(root, args) {

				let user = Object.assign({}, args);
				let alreadyExist = UserList.findIndex(u => u.id == user.id) >= 0;

				if (alreadyExist) {

					throw new Error(`User with this id already exists: ${user.id}`);

				}

				user.tasks = [];

				UserList.push(user);

				return user;

			}
		},

		updateUser: {
			type: User,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) },
				new_name: { type: GraphQLString },
				new_email: { type: GraphQLString }
			},
			resolve(root, args) {

				let update = Object.assign({}, args);
				let index = UserList.findIndex(u => u.id == update.id);

				if (!(index >= 0)) {

					throw new Error('User does not exist!');

				}

				UserList[ index ].name = update.new_name || UserList[ index ].name;
				UserList[ index ].email = update.new_email || UserList[ index ].email;

				return UserList[ index ];

			}
		},

		deleteUser: {

			type: User,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(root, { id }) {

				let index = UserList.findIndex(u => u.id == id);

				if (index >= 0) {

					let user = UserList.splice(index, 1);

					let task = TaskList.findIndex(t => t.userId == id);

					while (task !== -1) {

						TaskList.splice(task, 1);
						task = TaskList.findIndex(t => t.userId == id);


					}

					return user[ 0 ];

				} else {

					throw new Error('User does not exist!');

				}

			}

		},

		createTask: {
			type: Task,
			args: {
				userId: { type: new GraphQLNonNull(GraphQLString) },
				id: { type: new GraphQLNonNull(GraphQLString) },
				title: { type: new GraphQLNonNull(GraphQLString) },
				text: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(root, args) {

				let task = Object.assign({}, args);
				let alreadyExist = TaskList.findIndex(t => t.id == task.id) >= 0;
				let user = UserList.find(u => u.id == task.userId);

				if (alreadyExist) {

					throw new Error(`Task with this id already exists: ${task.id}`);

				}

				if (!(user)) {

					throw new Error(`User with this id does not exist: ${task.userId}`);

				}

				task.created_at = (new Date()).toString();

				TaskList.push(task);

				return task;

			}
		},

		updateTask: {
			type: Task,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) },
				new_title: { type: GraphQLString },
				new_text: { type: GraphQLString }
			},
			resolve(root, args) {

				let update = Object.assign({}, args);
				let index = TaskList.findIndex(t => t.id == update.id);

				if (!(index >= 0)) {

					throw new Error('Task does not exist!');

				}

				TaskList[ index ].text = update.new_text || TaskList[ index ].text;
				TaskList[ index ].title = update.new_title || TaskList[ index ].title;

				return TaskList[ index ];

			}
		},

		deleteTask: {

			type: Task,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(root, { id }) {

				let index = TaskList.findIndex(t => t.id == id);

				if (index >= 0) {

					let task = TaskList.splice(index, 1);
					return task[ 0 ];

				} else {

					throw new Error('Task does not exist!');

				}

			}

		}

	})

});

export default Mutation;

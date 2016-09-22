import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull
} from 'graphql';

import { User, Task } from '../types';
import { UserList, TaskList } from '../data';
import { UserModel, TaskModel } from '../../models';

const Mutation = new GraphQLObjectType({

	name: 'ToDoMutations',
	description: 'Mutations of our todo',
	fields: () => ({

		createUser: {
			type: User,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(root, args) {

				let user = Object.assign({}, args);
				
				return UserModel.create(user);

			}
		},

		updateUser: {
			type: User,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLString) },
				new_name: { type: GraphQLString },
				new_email: { type: GraphQLString }
			},
			resolve(root, args) {

				let _id = args._id;
				let data = {};

				(args.new_name) ? data.name = args.new_name : true;
				(args.new_email) ? data.email = args.new_email : true;

				return UserModel.update({ _id }, data);

			}
		},

		deleteUser: {

			type: User,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(root, { _id }) {

				return UserModel.delete({ _id });

			}

		},

		createTask: {
			type: Task,
			args: {
				userId: { type: new GraphQLNonNull(GraphQLString) },
				title: { type: new GraphQLNonNull(GraphQLString) },
				text: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(root, args) {

				args.created_at = (new Date()).toString();

				return TaskModel.create(args);

			}
		},

		updateTask: {
			type: Task,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLString) },
				new_title: { type: GraphQLString },
				new_text: { type: GraphQLString }
			},
			resolve(root, args) {

				let _id = args._id;
				let data = {};

				(args.new_title) ? data.title = args.new_title : true;
				(args.new_text) ? data.text = args.new_text : true;

				return TaskModel.update({ _id }, data);

			}
		},

		deleteTask: {

			type: Task,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(root, { _id }) {

				return TaskModel.delete({ _id });

			}

		}

	})

});

export default Mutation;

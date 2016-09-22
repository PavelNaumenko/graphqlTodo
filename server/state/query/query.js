import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
    GraphQLList
} from 'graphql';

import { User, Task } from '../types';
import { UserModel } from '../../models';

const Query = new GraphQLObjectType({

	name: 'ToDoSchema',
	description: 'Root of ToDoSchema',
	fields: () => ({
		users: {
			type: new GraphQLList(User),
			resolve() {

				return UserModel.getAll();

			}
		},
		user: {
			type: User,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(root, { _id }) {

				return UserModel.getOne({ _id });

			}

		}
	})

});

export default Query;

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
    GraphQLList
} from 'graphql';

import { User, Task } from '../types';
import { UserList, TaskList } from '../data';

const Query = new GraphQLObjectType({

	name: 'ToDoSchema',
	description: 'Root of ToDoSchema',
	fields: () => ({
		users: {
			type: new GraphQLList(User),
			resolve() {

				return UserList;

			}
		},
		user: {
			type: User,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(root, { id }) {

				return UserList.find(user => user.id == id);

			}

		}
	})

});

export default Query;
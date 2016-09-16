import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString
} from 'graphql';

import { TaskList } from '../data';
import Task from './task';

export default new GraphQLObjectType({

	name: 'User',
	description: 'This represent a user',
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		tasks: {
			type: new GraphQLList(Task),
			resolve(user) {

				let arr = [];
				TaskList.forEach((task) => {

					(task.userId == user.id) ? arr.push(task) : true;

				});
				return arr;

			}
		}
	})

});

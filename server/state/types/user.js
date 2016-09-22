import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString
} from 'graphql';

import { TaskList } from '../data';
import Task from './task';
import { TaskModel } from '../../models';

export default new GraphQLObjectType({

	name: 'User',
	description: 'This represent a user',
	fields: () => ({
		_id: { type: GraphQLString },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		tasks: {
			type: new GraphQLList(Task),
			resolve(user) {

				return TaskModel.getOne({ userId: user.id });

			}
		}
	})

});

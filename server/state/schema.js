import {
	GraphQLSchema
} from 'graphql';

import { User, Task } from './types';
import { UserList, TaskList } from './data';
import Query from './query/query';
import Mutation from './mutation/mutation';

const Schema = new GraphQLSchema({
	query: Query,
	mutation: Mutation
});

export default Schema;

import {
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

export default new GraphQLObjectType({

	name: 'Task',
	description: 'This represent an task',
	fields: () => ({
		id: { type: GraphQLString },
		title: { type: GraphQLString },
		text: { type: GraphQLString },
		created_at: { type: GraphQLString },
		userId: { type: GraphQLString }
	})

});

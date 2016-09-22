import path from 'path';
import http from 'http';
import config from 'config';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import TodoSchema from './state/schema';
import graphqlHTTP from 'express-graphql';

const mode = process.env.NODE_ENV;
const app = express();

// Connect to DB
mongoose.connect(config[mode].DATABASE, (error) => {

	if (error) {

		console.log(`Error: ${error}`);

	} else {

		console.log('//        Connected to API db        //');
		
	}

});

// Showing server view
app.use(express.static(path.join(__dirname, '../view')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../view'));
});

// Adding limits
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//Allow access
app.all('/*', (request, response, next) => {

	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	response.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');

	next();

});

// mount express-graphql as a route handlermount express-graphql as a route handler

app.use('/graphql', graphqlHTTP({
	schema: TodoSchema,
	graphiql: true
}));

// Handle crashed errors
process.on('uncaughtException', (err) => {
	console.log(err);
});

// Server started
http.createServer(app).listen(config[mode].PORT, () => {
	console.log(`// ${config[mode].APP_NAME} API running at :${config[mode].PORT} port //`);
});

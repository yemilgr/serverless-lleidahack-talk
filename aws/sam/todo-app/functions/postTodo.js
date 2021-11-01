const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const todoTable = process.env.TODO_TABLE;

exports.handler = async (event) => {
	const body = JSON.parse(event.body);
	const todo = {
		id: uuidv4(),
		todo: body.todo,
		date: Date.now(),
	};

	const result = await saveTodo(todo);

	return {
		statusCode: 200,
		body: JSON.stringify({ data: result }),
	};
};

async function saveTodo(todo) {
	const item = {
		TableName: todoTable,
		Item: todo,
	};

	return dynamo
		.put(item)
		.promise()
		.then(() => {
			return todo;
		});
}

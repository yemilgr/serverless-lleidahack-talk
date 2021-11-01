const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const todoTable = process.env.TODO_TABLE;

exports.handler = async (event) => {
	const id = event.queryStringParameters?.id;

	if (id) {
		const todo = await getTodo(id);

		return {
			statusCode: 200,
			body: JSON.stringify({ data: todo }),
		};
	}

	const todos = await getAll();

	return {
		statusCode: 200,
		body: JSON.stringify({ data: todos }),
	};
};

async function getTodo(id) {
	const params = {
		TableName: todoTable,
		Key: { id },
	};

	return dynamo
		.get(params)
		.promise()
		.then((result) => {
			return result.Item;
		});
}

async function getAll() {
	const params = {
		TableName: todoTable,
	};

	return dynamo
		.scan(params)
		.promise()
		.then((result) => {
			return result.Items;
		});
}

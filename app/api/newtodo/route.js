import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb"
import dynamoConnect from "@/app/utils/dynamoDB";
import { v4 as uuidv4 } from 'uuid';

const docClient = DynamoDBDocumentClient.from(dynamoConnect());
const TABLE_NAME = process.env.TABLE_NAME

export async function POST (req) {
    const {description} = await req.json();

    const todo = {
        id: uuidv4(),
        description
    };

    const params = new PutCommand({
        TableName: TABLE_NAME,
        Item: todo
    })

    try {
        await docClient.send(params);
        return new Response(JSON.stringify({success: true, item: todo}))
    } catch (error) {
        console.error
        return new Response(JSON.stringify({error: 'Fehler beim Adden auf DynamoDB Table'}))
    }
}
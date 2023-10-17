import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import dynamoConnect from '@/app/utils/dynamoDB';


const docClient = DynamoDBDocumentClient.from(dynamoConnect());
const TABLE_NAME = process.env.TABLE_NAME

export async function GET(req) {
  try {
    const params = new ScanCommand({
      TableName: TABLE_NAME,
    });

    const response = await docClient.send(params);

    return new Response(JSON.stringify(response.Items));
  } catch (error) {
    console.error("Fehler bei der Abfrage von DynamoDB:", error);

    return new Response(JSON.stringify({ error: 'Fehler bei der Abfrage von DynamoDB' }));
  }
}

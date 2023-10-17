import { DynamoDBDocumentClient, ScanCommand, DeleteCommand, DynamoDBDocumentClientCommand } from "@aws-sdk/lib-dynamodb";
import dynamoConnect from "@/app/utils/dynamoDB";

const docClient = DynamoDBDocumentClient.from(dynamoConnect());
const TABLE_NAME = process.env.TABLE_NAME

export async function POST(req) {
    try {
        const scanParams = new ScanCommand({ TableName: TABLE_NAME})
        const scanResult = await docClient.send(scanParams);

        for(const item of scanResult.Items) {
            const deleteParams = new DeleteCommand({
                TableName: TABLE_NAME,
                Key: {id: item.id},
            })
            await docClient.send(deleteParams);
        }
        return new Response(JSON.stringify({ success: true }))
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({ error: 'fehler beim loeschen aller eintraege'}))
    }
}
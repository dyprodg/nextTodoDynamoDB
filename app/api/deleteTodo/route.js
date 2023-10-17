import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import dynamoConnect from "@/app/utils/dynamoDB";

const docClient = DynamoDBDocumentClient.from(dynamoConnect());
const TABLE_NAME = process.env.NEXT_PUBLIC_TABLE_NAME

export async function POST(req) {
    const {id} = await req.json();

    const params = new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { id },
    })

    try {
        await docClient.send(params);
        return new Response(JSON.stringify({ success: true}))
    } catch (error) {
        return new Response(JSON.stringify({error:'Fehler bei API Todo loeschen'}))
    }

}
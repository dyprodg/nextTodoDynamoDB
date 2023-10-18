import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export default function dynamoConnect() {
  const dbClient = new DynamoDBClient({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      sessionToken: process.env.AWS_SESSION_TOKEN,
    },
  });

  return dbClient;
}

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export default function dynamoConnect() {
  const dbClient = new DynamoDBClient({
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    },
  });

  return dbClient;
}

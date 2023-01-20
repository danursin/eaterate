import { DynamoDBDocument, TranslateConfig } from "@aws-sdk/lib-dynamodb";

import { DynamoDB } from "@aws-sdk/client-dynamodb";
import config from "@/config";

const { region, accessKeyId, secretAccessKey } = config;

const dynamodb = new DynamoDB({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
});

const translateConfig: TranslateConfig = {
    marshallOptions: {
        // Whether to automatically convert empty strings, blobs, and sets to `null`.
        convertEmptyValues: false, // false, by default.
        // Whether to remove undefined values while marshalling.
        removeUndefinedValues: false, // false, by default.
        // Whether to convert typeof object to map attribute.
        convertClassInstanceToMap: false // false, by default.
    },
    unmarshallOptions: {
        // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
        wrapNumbers: false // false, by default.
    }
};

const dynamodbClient = DynamoDBDocument.from(dynamodb, translateConfig);
export default dynamodbClient;

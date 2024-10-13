const accessKeyId = process.env.X_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.X_AWS_SECRET_ACCESS_KEY;
const region = process.env.X_AWS_REGION;
const tableName = process.env.X_AWS_DYNAMODB_TABLENAME;

export default {
    secretAccessKey,
    accessKeyId,
    region,
    tableName,
    userID: "12345"
} as {
    secretAccessKey: string;
    accessKeyId: string;
    region: string;
    tableName: string;
    userID: string;
};

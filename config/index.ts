const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION;
const tableName = process.env.AWS_DYNAMODB_TABLENAME;

export default {
    secretAccessKey,
    accessKeyId,
    region,
    tableName
} as {
    secretAccessKey: string;
    accessKeyId: string;
    region: string;
    tableName: string;
};

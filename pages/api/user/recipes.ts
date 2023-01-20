import type { NextApiRequest, NextApiResponse } from "next";

import { RecipeItem } from "@/types";
import config from "@/config";
import dynamoDbClient from "@/services/DynamoDbClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse<RecipeItem[]>) {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        return;
    }
    try {
        const email = "danursin@gmail.com";
        const RecipePK: RecipeItem["PK"] = `USER#${email}`;
        const RecipeSK: RecipeItem["SK"] = "RECIPE#";
        const result = await dynamoDbClient.query({
            TableName: config.tableName,
            KeyConditionExpression: "#PK = :PK AND begins_with(#SK, :SK)",
            ExpressionAttributeNames: {
                "#PK": "PK",
                "#SK": "SK"
            },
            ExpressionAttributeValues: {
                ":PK": RecipePK,
                ":SK": RecipeSK
            },
            Limit: 10
        });

        if (!result.Items) {
            throw new Error("No result items");
        }

        res.json(result.Items as RecipeItem[]);
    } catch (err) {
        res.status(500).end((err as Error).message);
    }
}

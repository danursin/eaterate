import type { NextApiRequest, NextApiResponse } from "next";
import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

import { RecipeItem } from "@/types";
import config from "@/config";
import dynamodb from "@/services/DynamoDbClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
    const { method } = req;
    if (!["GET", "POST"].includes(method as string)) {
        res.setHeader("Allow", ["POST", "GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
        return;
    }

    if(method === "GET"){
        const response = await dynamodb.send(new QueryCommand({
            TableName: config.tableName,
            KeyConditionExpression: `PK = :pk AND begins_with(SK, :sk)`,
            ExpressionAttributeValues: {
                ":pk": `USER#${config.userID}`,
                ":sk": "RECIPE#"
            }
        }));
        res.status(200).json(response.Items as RecipeItem[]);
    }

    if(method === "POST"){
        const { title, instructions, ingredients } = req.body as RecipeItem;
        const ingredientsToUpperCase = ingredients.map((ingredient) => ingredient.toUpperCase()); 
        const item: RecipeItem = {
            PK: `USER#${config.userID}`,
            SK: `RECIPE#${Date.now()}`,
            Type: "RECIPE",
            title,
            instructions,
            ingredients: ingredientsToUpperCase
        };
        await dynamodb.send(new PutCommand({
            TableName: config.tableName,
            Item: item
        }));
        res.status(200).json(item);
    }
}

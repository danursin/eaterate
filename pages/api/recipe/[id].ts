import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import type { NextApiRequest, NextApiResponse } from "next";

import { RecipeItem } from "@/types";
import config from "@/config";
import dynamodb from "@/services/DynamoDbClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
    const { method } = req;
    const { id } = req.query as { id: string;};
    switch (method) {
        case "GET": {
            const response = await dynamodb.send(new GetCommand({
                TableName: config.tableName,
                Key: {
                    PK: `USER#${config.userID}`,
                    SK: `RECIPE#${id}`
                }
            }));
            if (!response.Item) {
                res.status(404).end("Not Found");
                return;
            }
            res.status(200).json(response.Item);
            break;
        }
        case "PUT":{
            const { title, instructions, ingredients } = req.body as RecipeItem;
            const ingredientsToUpperCase = ingredients.map((ingredient) => ingredient.toUpperCase());
            const item: RecipeItem = {
                PK: `USER#${config.userID}`,
                SK: `RECIPE#${id}`,
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
            break;
        }
        default:
            res.setHeader("Allow", ["GET", "PUT", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

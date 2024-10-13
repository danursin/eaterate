import type { NextApiRequest, NextApiResponse } from "next";

import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { RecipeItem } from "@/types";
import config from "@/config";
import dynamodb from "@/services/DynamoDbClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
    const { method } = req;
    if (method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
        return;
    }
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

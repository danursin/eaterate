import { IngredientItem, RecipeItemIngredient } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

import { QueryCommandInput } from "@aws-sdk/lib-dynamodb";
import config from "@/config";
import dynamodb from "@/services/DynamoDbClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse<RecipeItemIngredient[]>) {
    try {
        const { method, query } = req;

        if(method !== "GET"){
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
            return;
        }

        const PK: IngredientItem["PK"] = "INGREDIENT";

        const input: QueryCommandInput = {
            TableName: config.tableName,
            ExpressionAttributeNames: {
                "#PK": "PK",
                "#SK": "SK",
                "#name": "name" // Ensure this is always included
            },
            ExpressionAttributeValues: {
                ":PK": PK
            },
            ProjectionExpression: "#SK, #name"
        };
        
        if (query.sw) {
            const SK: IngredientItem["SK"] = (query.sw as string).toUpperCase() as Uppercase<string>;
            input.KeyConditionExpression = "#PK = :PK AND begins_with(#SK, :SK)";
            input.ExpressionAttributeValues =  {
                ":PK": PK,
                ":SK": SK
            };
        } else {
            input.KeyConditionExpression = "#PK = :PK";
        }

        const result = await dynamodb.query(input);
        
        if (!result.Items) {
            throw new Error(JSON.stringify(result));
        }

        res.status(200).json(result.Items as RecipeItemIngredient[]);
            
    } catch (err) {
        res.status(500).end((err as Error).message);
    }
}

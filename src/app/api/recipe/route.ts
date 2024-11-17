import { NextRequest, NextResponse } from "next/server";
import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import dynamodb, { TABLE_NAME } from "@/db/dynamodb";

import config from "@/config";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
    try {
        const result = await dynamodb.send(new QueryCommand({
            TableName: TABLE_NAME,
            KeyConditionExpression: "PK = :PK AND begins_with(SK, :recipeType)",
            ExpressionAttributeValues: {
                ":PK": `USER#${config.userID}`,
                ":recipeType": "RECIPE"
            }
        }));

        return NextResponse.json(result.Items || []);
    } catch (error) {
        console.error("Error retrieving recipe list:", error);
        return NextResponse.json({ message: "Failed to fetch recipes" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const { title, instructions, ingredients } = await request.json();
    const recipeId = uuidv4(); 

    const newRecipe = {
        PK: `USER#${config.userID}`,
        SK: `RECIPE#${recipeId}`,
        Type: "RECIPE",
        title,
        instructions,
        ingredients
    };

    try {
        const command = new PutCommand({
            TableName: TABLE_NAME,
            Item: newRecipe
        });

        await dynamodb.send(command);

        return NextResponse.json(newRecipe, { status: 201 });
    } catch (error) {
        console.error("Error creating recipe:", error);
        return NextResponse.json({ message: "Failed to create recipe" }, { status: 500 });
    }
}

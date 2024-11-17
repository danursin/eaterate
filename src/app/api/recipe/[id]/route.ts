import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { NextRequest, NextResponse } from "next/server";
import dynamodb, { TABLE_NAME } from "@/db/dynamodb";

import { RouteContext } from "@/types";
import config from "@/config";

// GET request to retrieve a recipe by ID
export async function GET(
    request: NextRequest,
    context: RouteContext<{ id: string }>
) {
    const params = await context.params; // Await the params due to Promise typing
    const recipeId = `RECIPE#${params.id}`; // Construct the SK using the recipe ID

    try {
        const command = new GetCommand({
            TableName: TABLE_NAME,
            Key: {
                PK: `USER#${config.userID}`, // Assuming a static user ID; adjust as needed
                SK: recipeId
            }
        });

        const result = await dynamodb.send(command);

        if (!result.Item) {
            return NextResponse.json({ message: "Recipe not found" }, { status: 404 });
        }

        return NextResponse.json(result.Item);
    } catch (error) {
        console.error("Error retrieving recipe:", error);
        return NextResponse.json({ message: "Failed to fetch recipe" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const { title, instructions, ingredients } = await request.json();
    const recipeId = `RECIPE#${params.id}`;

    try {
        const command = new UpdateCommand({
            TableName: TABLE_NAME,
            Key: {
                PK: `USER#${config.userID}`,
                SK: recipeId,
            },
            UpdateExpression: `
                SET #title = :title,
                    #instructions = :instructions,
                    #ingredients = :ingredients
            `,
            ExpressionAttributeNames: {
                "#title": "title",
                "#instructions": "instructions",
                "#ingredients": "ingredients",
            },
            ExpressionAttributeValues: {
                ":title": title,
                ":instructions": instructions,
                ":ingredients": ingredients,
            },
            ReturnValues: "ALL_NEW"
        });

        const result = await dynamodb.send(command);

        return NextResponse.json(result.Attributes);
    } catch (error) {
        console.error("Error updating recipe:", error);
        return NextResponse.json({ message: "Failed to update recipe" }, { status: 500 });
    }
}

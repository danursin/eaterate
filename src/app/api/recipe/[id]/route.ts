// src/app/api/recipe/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { RecipeItem, RouteContext } from "@/types";

const recipes: RecipeItem[] = [
    {
        PK: `USER#12345`, // Example user ID
        SK: `RECIPE#1`,
        Type: "RECIPE",
        title: "Spaghetti Bolognese",
        instructions: "A classic Italian pasta dish with a rich tomato sauce.",
        ingredients: ["Spaghetti", "Ground Beef", "Tomato Sauce", "Garlic"]
    },
    {
        PK: `USER#12345`,
        SK: `RECIPE#2`,
        Type: "RECIPE",
        title: "Chicken Curry",
        instructions: "A flavorful chicken curry with spices and coconut milk.",
        ingredients: ["Chicken", "Curry Powder", "Coconut Milk", "Onions"]
    },
    {
        PK: `USER#12345`,
        SK: `RECIPE#3`,
        Type: "RECIPE",
        title: "Chocolate Cake",
        instructions: "A rich and moist chocolate cake perfect for dessert.",
        ingredients: ["Flour", "Cocoa Powder", "Eggs", "Butter"]
    }
];

export async function GET(request: NextRequest, context: RouteContext<{ id: string }>): Promise<NextResponse> {
    const id = (await context.params).id;
    const recipeId: RecipeItem["SK"] = `RECIPE#${id}`;

    const recipe = recipes.find((r) => r.SK === recipeId);

    if (!recipe) {
        return NextResponse.json({ message: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json(recipe);
}

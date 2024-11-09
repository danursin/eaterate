import { NextRequest, NextResponse } from 'next/server';

import { RecipeItem } from "@/types";

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

export async function GET(_request: NextRequest) {
    return NextResponse.json(recipes);
}

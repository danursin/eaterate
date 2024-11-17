// src/app/recipe/new/page.tsx
"use client";

import { Container, Header } from "semantic-ui-react";

import RecipeForm from "@/app/components/RecipeForm";
import { RecipeItem } from "@/types";
import { useRouter } from "next/navigation";

const CreateRecipePage = () => {
    const router = useRouter();

    const handleCreateRecipe = async (recipeData: Omit<RecipeItem, "PK" | "SK" | "Type">) => {
        const res = await fetch("/api/recipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(recipeData)
        });

        if (res.ok) {
            router.push("/");
        } else {
            console.error("Failed to create recipe");
        }
    };

    return (
        <Container>
            <Header as="h1">Create New Recipe</Header>
            <RecipeForm onSubmit={handleCreateRecipe} />
        </Container>
    );
};

export default CreateRecipePage;

"use client";

import { Button, Container, Header, Loader } from "semantic-ui-react";
import { useEffect, useState } from "react";

import RecipeForm from "@/app/components/RecipeForm";
import { RecipeItem } from "@/types";
import { useParams } from "next/navigation";

const RecipeDetailsPage = () => {
    const params = useParams();
    const id = params?.id;
    const [recipe, setRecipe] = useState<RecipeItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchRecipe = async () => {
            try {
                const res = await fetch(`/api/recipe/${id}`);
                if (!res.ok) throw new Error("Failed to fetch recipe details");
                const data = await res.json();
                setRecipe(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleUpdateRecipe = async (updatedRecipe: Partial<RecipeItem>) => {
        try {
            const res = await fetch(`/api/recipe/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedRecipe)
            });

            if (!res.ok) throw new Error("Failed to update recipe");

            const updatedData = await res.json();
            setRecipe(updatedData);
            setEditing(false);
        } catch (error) {
            console.error("Error updating recipe:", error);
        }
    };

    if (loading)
        return (
            <Loader active inline="centered">
                Loading Recipe...
            </Loader>
        );
    if (!recipe) return <p>No recipe found.</p>;

    return (
        <Container>
            {editing ? (
                <>
                    <Header as="h1">Edit Recipe</Header>
                    <RecipeForm initialData={recipe} onSubmit={handleUpdateRecipe} />
                </>
            ) : (
                <>
                    <Header as="h1">{recipe.title}</Header>
                    <p>{recipe.instructions}</p>

                    <Header as="h3">Ingredients</Header>
                    <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>

                    <Button primary onClick={() => setEditing(true)}>
                        Edit Recipe
                    </Button>
                </>
            )}
        </Container>
    );
};

export default RecipeDetailsPage;

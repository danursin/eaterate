"use client";

import { Container, Header, List, Loader } from "semantic-ui-react";
import { useEffect, useState } from "react";

import { RecipeItem } from "@/types";
import { useParams } from "next/navigation";

const RecipeDetailsPage = () => {
    const params = useParams();
    const id = params?.id;
    const [recipe, setRecipe] = useState<RecipeItem | null>(null);
    const [loading, setLoading] = useState(true);

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

    if (loading)
        return (
            <Loader active inline="centered">
                Loading Recipe...
            </Loader>
        );
    if (!recipe) return <p>No recipe found.</p>;

    return (
        <Container>
            <Header as="h1">{recipe.title}</Header>
            <p>{recipe.instructions}</p>

            <Header as="h3">Ingredients</Header>
            <List bulleted>
                {recipe.ingredients.map((ingredient, index) => (
                    <List.Item key={index}>{ingredient}</List.Item>
                ))}
            </List>
        </Container>
    );
};

export default RecipeDetailsPage;

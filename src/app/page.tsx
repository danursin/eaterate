"use client";

import { Button, Container, Header, List, Loader } from "semantic-ui-react";
import { useEffect, useState } from "react";

import Link from "next/link";
import { RecipeItem } from "../types";
import { toast } from "react-toastify";

const HomePage = () => {
    const [recipes, setRecipes] = useState<RecipeItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await fetch("/api/recipe");
                if (!res.ok) throw new Error("Failed to fetch recipes");
                const data = await res.json();
                setRecipes(data);
            } catch (error) {
                toast.error((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <Container>
            <Header as="h1">Recipe List</Header>
            <Link href="/recipe/new" passHref>
                <Button primary>Create New Recipe</Button>
            </Link>
            {loading ? (
                <Loader active inline="centered">
                    Loading Recipes...
                </Loader>
            ) : (
                <List divided relaxed>
                    {recipes.map((recipe) => (
                        <List.Item key={recipe.SK}>
                            <List.Content>
                                <List.Header as={Link} href={`/recipe/${recipe.SK.split("#")[1]}`}>
                                    {recipe.title}
                                </List.Header>
                                <List.Description>{recipe.instructions.substring(0, 50)}...</List.Description>
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
            )}
        </Container>
    );
};

export default HomePage;

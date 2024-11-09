import { Suspense, useEffect, useState } from "react";

import Head from "next/head";
import { RecipeItem } from "@/types";
import RecipeList from "@/components/RecipeList";

const recipes = [
    {
        id: "1",
        title: "Spaghetti Bolognese",
        description: "A classic Italian dish with a rich, savory meat sauce and perfectly cooked pasta."
    },
    { id: "2", title: "Grilled Cheese", description: "Golden, crispy bread with gooey melted cheese inside, the perfect comfort food." }
];

export default function Home() {
    const [recipes, setRecipes] = useState<RecipeItem[]>();
    useEffect(() => {
        (async () => {
            const response = await fetch("/api/recipe");
            if (response.ok) {
                const json = (await response.json()) as RecipeItem[];
                setRecipes(json);
            }
        })();
    }, []);

    return (
        <>
            <Head>
                <title>Eaterate</title>
            </Head>
            {recipes ? <RecipeList recipes={recipes} /> : <div>Loading...</div>}
        </>
    );
}

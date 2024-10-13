import { Button } from "semantic-ui-react";
import Head from "next/head";
import Link from "next/link";
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
    return (
        <>
            <Head>
                <title>Eaterate</title>
            </Head>
            <RecipeList recipes={recipes} />
        </>
    );
}

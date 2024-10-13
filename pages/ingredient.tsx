import { Icon, List } from "semantic-ui-react";
import { useCallback, useEffect, useState } from "react";

import { IngredientItem } from "@/types";
import { NextComponentType } from "next";
import PageHeader from "@/components/PageHeader";
import useIngredients from "@/hooks/useIngredients";

const Ingredient: NextComponentType = () => {
    const [ingredients, setIngredients] = useState<Partial<IngredientItem>[]>();

    const { searchIngredients } = useIngredients();

    const fetchIngredients = useCallback(async ({ sw }: { sw: string } = { sw: "" }) => {
        try {
            const data = await searchIngredients(sw);
            setIngredients(data);
        } catch (err) {
            alert((err as Error).message);
        }
    }, []);

    useEffect(() => {
        (async () => {
            await fetchIngredients();
        })();
    }, [fetchIngredients]);

    if (!ingredients) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <PageHeader title="Ingredients" />
            {!ingredients.length ? (
                <p>No ingredients found</p>
            ) : (
                <List celled animated>
                    {ingredients.map((i) => (
                        <List.Item key={i.SK}>
                            <List.Content floated="right">
                                <Icon name="trash" color="red" link />
                            </List.Content>
                            <List.Content>{i.name}</List.Content>
                        </List.Item>
                    ))}
                </List>
            )}
        </>
    );
};

export default Ingredient;

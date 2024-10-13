import { Form, Grid } from "semantic-ui-react";

import IngredientInput from "@/components/IngredientInput";
import { NextComponentType } from "next";
import PageHeader from "@/components/PageHeader";
import { RecipeItem } from "@/types";
import { useState } from "react";

type RecipeFormModel = Pick<RecipeItem, "title" | "instructions" | "ingredients">;

const Recipe: NextComponentType = () => {
    const [model, setModel] = useState<RecipeFormModel>({
        title: "",
        instructions: "",
        ingredients: [""]
    });
    const onSubmit = async () => {
        try {
            const response = await fetch("/api/recipe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(model)
            });
            if (!response.ok) {
                throw new Error("Failed to save recipe");
            }
            alert("Recipe saved successfully");
        } catch (error) {
            alert("Failed to save recipe");
        }
    };

    const onAddIngredient = () => {
        setModel({ ...model, ingredients: [...model.ingredients, ""] });
    };

    return (
        <>
            <PageHeader title="Add New Recipe" />
            <Form onSubmit={onSubmit}>
                <Form.Input
                    type="text"
                    placeholder="Beef Stroganoff"
                    value={model.title}
                    label="Recipe Title"
                    onChange={(e, { value }) => setModel({ ...model, title: value })}
                />
                <Form.TextArea
                    placeholder="Blend dry ingredients in small bowl"
                    value={model.instructions}
                    label="Instructions"
                    rows="3"
                    onChange={(e, { value }) => setModel({ ...model, instructions: value as string })}
                />
                {model.ingredients.map((ingredient, index) => (
                    <Grid>
                        <Grid.Column width={12}>
                            <IngredientInput
                                key={index}
                                value={ingredient}
                                onChange={(value) => {
                                    const newIngredients = [...model.ingredients];
                                    newIngredients[index] = value;
                                    setModel({ ...model, ingredients: newIngredients });
                                }}
                            />
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <Form.Button
                                label="&nbsp;"
                                type="button"
                                icon="trash"
                                content="Remove"
                                fluid
                                color="red"
                                onClick={() => {
                                    const newIngredients = [...model.ingredients];
                                    newIngredients.splice(index, 1);
                                    setModel({ ...model, ingredients: newIngredients });
                                }}
                            />
                        </Grid.Column>
                        {index === model.ingredients.length - 1 && (
                            <Grid.Column width={2}>
                                <Form.Button
                                    label="&nbsp;"
                                    content="Add"
                                    type="button"
                                    fluid
                                    icon="plus"
                                    color="green"
                                    onClick={onAddIngredient}
                                />
                            </Grid.Column>
                        )}
                    </Grid>
                ))}
                <Form.Button type="submit" content="Save Recipe" color="blue" icon="save" />
            </Form>
        </>
    );
};

export default Recipe;

"use client";

import { Button, Form } from "semantic-ui-react";

import { RecipeItem } from "@/types";
import { useState } from "react";

interface RecipeFormProps {
    onSubmit: (recipe: Omit<RecipeItem, "PK" | "SK" | "Type">) => void;
    initialData?: Partial<Omit<RecipeItem, "PK" | "SK" | "Type">>;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit, initialData }) => {
    const [title, setTitle] = useState(initialData?.title || "");
    const [instructions, setInstructions] = useState(initialData?.instructions || "");
    const [ingredients, setIngredients] = useState<string[]>(initialData?.ingredients || [""]);

    const handleIngredientChange = (index: number, value: string) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index] = value;
        setIngredients(updatedIngredients);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, ""]);
    };

    const handleRemoveIngredient = (index: number) => {
        const updatedIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(updatedIngredients);
    };

    const handleSubmit = () => {
        onSubmit({ title, instructions, ingredients: ingredients.filter(Boolean) });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Input label="Title" placeholder="Recipe Title" value={title} onChange={(_, { value }) => setTitle(value)} required />
            <Form.TextArea
                label="Instructions"
                placeholder="Recipe instructions"
                value={instructions}
                onChange={(_, { value }) => setInstructions(value as string)}
                required
            />

            {ingredients.map((ingredient, index) => (
                <Form.Group key={index} widths="equal">
                    <Form.Input
                        placeholder="Ingredient"
                        value={ingredient}
                        onChange={(_, { value }) => handleIngredientChange(index, value)}
                        style={{ flex: 1 }}
                    />
                    <Button
                        icon="minus"
                        color="red"
                        onClick={() => handleRemoveIngredient(index)}
                        style={{ alignSelf: "center", marginLeft: "8px" }}
                    />
                </Form.Group>
            ))}
            <Button type="button" onClick={handleAddIngredient} color="green" icon="plus" content="Add Ingredient" />
            <Button type="submit" primary fluid>
                Submit
            </Button>
        </Form>
    );
};

export default RecipeForm;

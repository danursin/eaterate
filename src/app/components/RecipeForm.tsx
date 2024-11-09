// src/components/RecipeForm.tsx
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

    const handleAddIngredient = () => setIngredients([...ingredients, ""]);
    const handleRemoveIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        onSubmit({ title, instructions, ingredients });
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
            <Form.Field label="Ingredients">
                {ingredients.map((ingredient, index) => (
                    <div key={index} style={{ display: "flex", marginBottom: "8px" }}>
                        <Form.Input
                            placeholder="Ingredient"
                            value={ingredient}
                            onChange={(_, { value }) => handleIngredientChange(index, value)}
                            style={{ flex: 1, marginRight: "8px" }}
                        />
                        <Button icon="minus" color="red" onClick={() => handleRemoveIngredient(index)} />
                    </div>
                ))}
                <Button type="button" onClick={handleAddIngredient} color="green" icon="plus" content="Add Ingredient" />
            </Form.Field>
            <Button type="submit" primary>
                Submit
            </Button>
        </Form>
    );
};

export default RecipeForm;

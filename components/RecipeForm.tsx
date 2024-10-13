import { Button, Form, Input, TextArea } from "semantic-ui-react";
import React, { useState } from "react";
import { RecipeItem, RecipeItemIngredient } from "../types";

interface RecipeFormProps {
    initialData?: RecipeItem; // For editing, we can pass in existing recipe data
    onSubmit: (recipe: Omit<RecipeItem, "PK" | "SK" | "Type">) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ initialData, onSubmit }) => {
    const [title, setTitle] = useState<string>(initialData?.title || "");
    const [instructions, setInstructions] = useState<string>(initialData?.instructions || "");
    const [ingredients, setIngredients] = useState<RecipeItemIngredient[]>(initialData?.ingredients || []);

    const handleIngredientChange = (index: number, field: keyof RecipeItemIngredient, value: string) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index] = {
            ...updatedIngredients[index],
            [field]: value
        };
        setIngredients(updatedIngredients);
    };

    const addIngredient = () => {
        setIngredients([...ingredients, { text: "", quantity: undefined, unit: undefined }]);
    };

    const removeIngredient = (index: number) => {
        const updatedIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(updatedIngredients);
    };

    const handleSubmit = () => {
        const recipeData: Omit<RecipeItem, "PK" | "SK" | "Type"> = {
            title,
            instructions,
            ingredients
        };
        onSubmit(recipeData);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <label>Recipe Title</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter recipe title" />
            </Form.Field>
            <Form.Field>
                <label>Instructions</label>
                <TextArea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Enter cooking instructions" />
            </Form.Field>
            <Form.Field>
                <label>Ingredients</label>
                {ingredients.map((ingredient, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                        <Input
                            placeholder="Ingredient"
                            value={ingredient.text}
                            onChange={(e) => handleIngredientChange(index, "text", e.target.value)}
                            style={{ marginRight: "5px" }}
                        />
                        <Input
                            placeholder="Quantity"
                            value={ingredient.quantity?.toString() || ""}
                            onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}
                            style={{ marginRight: "5px" }}
                        />
                        <Input
                            placeholder="Unit"
                            value={ingredient.unit || ""}
                            onChange={(e) => handleIngredientChange(index, "unit", e.target.value)}
                            style={{ marginRight: "5px" }}
                        />
                        <Button onClick={() => removeIngredient(index)} icon="remove" />
                    </div>
                ))}
                <Button onClick={addIngredient} icon="add" />
            </Form.Field>
            <Button type="submit" primary>
                Submit Recipe
            </Button>
        </Form>
    );
};

export default RecipeForm;

import { DropdownOnSearchChangeData, DropdownProps, Form, Grid } from "semantic-ui-react";
import React, { useCallback, useEffect, useState } from "react";

import { IngredientItem } from "@/types";
import useIngredients from "@/hooks/useIngredients";

interface IngredientInputProps {
    value?: string | undefined;
    onChange: (ingredient: string) => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ value, onChange }) => {
    const [localValue, setLocalValue] = useState<string>(value ?? "");
    const { searchIngredients } = useIngredients();
    const [ingredients, setIngredients] = useState<IngredientItem[]>([]);

    const handleSearchChange = useCallback(
        async (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownOnSearchChangeData) => {
            const { value } = data;
            if (!value) {
                setIngredients([]);
                return;
            }

            const options = await searchIngredients(value as string);
            setIngredients(options);
        },
        [searchIngredients]
    );

    const handleIngredientSelection = (value: string) => {
        // If user selects an existing ingredient
        setLocalValue(value);
    };

    const handleAddIngredient = (event: React.SyntheticEvent, data: DropdownProps) => {
        // If user adds a new ingredient
        const name = data.value as string;
        setLocalValue(name);
        setIngredients([{ PK: "INGREDIENT", SK: name.toUpperCase() as Uppercase<string>, Type: "INGREDIENT", name }]);
    };

    return (
        <Form.Dropdown
            label="Ingredient Name"
            search
            selection
            onSearchChange={handleSearchChange}
            placeholder="Start typing to search or add"
            options={ingredients.map((i) => ({ key: i.PK, value: i.name, text: i.name }))}
            value={localValue || ""}
            onChange={(e, { value }) => handleIngredientSelection(value as string)}
            allowAdditions
            additionLabel="Add new ingredient: "
            onAddItem={handleAddIngredient}
        />
    );
};

export default IngredientInput;

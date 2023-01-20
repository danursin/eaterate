import { Form } from "semantic-ui-react";
import { NextComponentType } from "next";
import PageHeader from "@/components/PageHeader";
import { RecipeItem } from "@/types";
import { useState } from "react";

type RecipeFormModel = Pick<RecipeItem, "title" | "instructions" | "ingredients">;

const Recipe: NextComponentType = () => {
    const [model, setModel] = useState<RecipeFormModel>({
        title: "",
        instructions: "",
        ingredients: []
    });
    const onSubmit = async () => {};

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
            </Form>
        </>
    );
};

export default Recipe;

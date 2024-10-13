import { Image, List, Placeholder } from "semantic-ui-react";

import Link from "next/link";
import React from "react";

interface RecipeListProps {
    recipes?: { title: string; description: string; id: string }[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
    return (
        <div>
            {recipes && recipes.length > 0 ? (
                <List divided relaxed>
                    {recipes.map((recipe) => (
                        <List.Item key={recipe.id} as={Link} href={`/recipe/${recipe.id}`}>
                            <Image
                                src="https://picsum.photos/200" // Placeholder image for now
                                size="small"
                                floated="left"
                            />
                            <List.Content>
                                <List.Header>{recipe.title}</List.Header>
                                <List.Description>{recipe.description}</List.Description>
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
            ) : (
                <PlaceholderList />
            )}
        </div>
    );
};

// Placeholder component while recipes are loading or empty
const PlaceholderList: React.FC = () => {
    return (
        <List divided relaxed>
            {[...Array(3)].map((_, index) => (
                <List.Item key={index}>
                    <Placeholder>
                        <Placeholder.Image square />
                        <Placeholder.Header>
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Header>
                    </Placeholder>
                </List.Item>
            ))}
        </List>
    );
};

export default RecipeList;

import { Card, List } from "semantic-ui-react";
import { GetServerSideProps, NextPage } from "next";

import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import { RecipeItem } from "../../types";
import config from "@/config";
import dynamodb from "@/services/DynamoDbClient";

interface RecipeDetailsProps {
    recipe: RecipeItem | null;
}

const RecipeDetails: NextPage<RecipeDetailsProps> = ({ recipe }) => {
    if (!recipe) {
        return <div>Recipe not found</div>;
    }

    return (
        <div>
            <Card>
                <Card.Content>
                    <Card.Header>{recipe.title}</Card.Header>
                    <Card.Description>
                        <h3>Ingredients:</h3>
                        <List>
                            {recipe.ingredients.map((ingredient, index) => (
                                <List.Item key={index}>
                                    {ingredient.quantity ? `${ingredient.quantity} ` : ""}
                                    {ingredient.unit ? `${ingredient.unit} ` : ""}
                                    {ingredient.text}
                                </List.Item>
                            ))}
                        </List>
                        <h3>Instructions:</h3>
                        <p>{recipe.instructions}</p>
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>
    );
};

export default RecipeDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };

    const params = {
        TableName: config.tableName,
        Key: {
            PK: `USER#${config.userID}`,
            SK: `RECIPE#${id}`
        }
    };

    try {
        const data = await dynamodb.send(new GetCommand(params));
        const recipe = data.Item as RecipeItem;

        if (!recipe) {
            return {
                props: {
                    recipe: null
                }
            };
        }

        return {
            props: {
                recipe
            }
        };
    } catch (error) {
        console.error("Error fetching recipe:", error);

        return {
            props: {
                recipe: null
            }
        };
    }
};

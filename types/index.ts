export type ItemType = UserItemType | RecipeItemType;

export interface DynamoDbItem {
    PK: string;
    SK: string;
    Type: ItemType;
    GSI1PK?: string | undefined;
    GSI1SK?: string | undefined;
    __ttl?: number | undefined;
}

export type UserItemType = "USER";
export interface UserItem extends DynamoDbItem {
    PK: `USER#${string}`;
    SK: `META`;
    Type: UserItemType;
}

export interface RecipeItemIngredient {
    text: string;
    amount?: string | undefined;
    unit?: string | undefined;
}

export type RecipeItemType = "RECIPE";
export interface RecipeItem extends DynamoDbItem {
    PK: `USER#${string}`;
    SK: `RECIPE#${string}`;
    Type: RecipeItemType;
    title: string;
    steps: string;
    ingredients: RecipeItemIngredient[];
}

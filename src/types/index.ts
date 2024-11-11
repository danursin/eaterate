export type ItemType = UserItemType | RecipeItemType | IngredientItemType;

export type MetadataItemType = "META";

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
    PK: `${UserItemType}#${string}`;
    SK: MetadataItemType;
    Type: UserItemType;
}

export type RecipeItemType = "RECIPE";
export interface RecipeItem extends DynamoDbItem {
    PK: `${UserItemType}#${string}`;
    SK: `${RecipeItemType}#${string}`;
    Type: RecipeItemType;
    title: string;
    instructions: string;
    ingredients: string[];
}

export type IngredientItemType = "INGREDIENT";
export interface IngredientItem extends DynamoDbItem {
    PK: IngredientItemType;
    /** The name of the ingredient, uppercased */
    SK: Uppercase<string>;
    Type: IngredientItemType;
    /** The original casing of the ingredient */
    name: string;
}

export type RouteContext<T extends Record<string, string>> = {
    params: Promise<T>;
};
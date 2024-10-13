import { IngredientItem } from "@/types";
import config from "./config";
import dynamodb from "./services/DynamoDbClient";

describe("dynamodb tests", () => {
    const { tableName } = config;
    test("PUT object", async () => {

        const name = "Onion";
        const item: IngredientItem = {
            PK: "INGREDIENT",
            SK: name.toUpperCase() as Uppercase<string>,
            Type: "INGREDIENT",
            name: name
        };

        const result = await dynamodb.put({
            TableName: tableName,
            Item: item,
            ConditionExpression: "attribute_not_exists(PK)"
        });

        console.log(result);
    });
});
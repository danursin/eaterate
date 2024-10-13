# Eaterate

## Entities

| Name       | PK Pattern   | SK Pattern        | Description                                                         |
| ---------- | ------------ | ----------------- | ------------------------------------------------------------------- |
| User       | USER#<email> | META              | A user of the application                                           |
| Recipe     | USER#<email> | RECIPE#<recipeId> | A set of ingredients and instructions for preparing a dish          |
| Ingredient | INGREDIENT   | <NAME>            | A registered ingredient to be reused and displayed for autocomplete |

## Read Access Patterns

| Description                       | Supporting Index                       |
| --------------------------------- | -------------------------------------- |
| Get user details                  | PK/SK                                  |
| Get user recipes                  | PK, begins_with(SK, "RECIPE")          |
| List ingredients for autocomplete | PK and begins_with(SK, "search value") |

# Eaterate

## Entities

| Name   | PK Pattern   | SK Pattern        | Description                                                |
| ------ | ------------ | ----------------- | ---------------------------------------------------------- |
| User   | USER#<email> | META              | A user of the application                                  |
| Recipe | USER#<email> | RECIPE#<recipeId> | A set of ingredients and instructions for preparing a dish |

|

## Read Access Patterns

| Description      | Supporting Index          |
| ---------------- | ------------------------- |
| Get user details | PK/SK                     |
| Get user recipes | PK, SK starts with RECIPE |

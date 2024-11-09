# Recipe Management App

A recipe management application built with Next.js and Semantic UI React. This app allows users to view a list of recipes and see detailed information for each one.

## Overview

This project demonstrates a simple recipe management system, where users can:

-   View a list of available recipes on the home page.
-   Click on a recipe to view more detailed instructions and ingredients.

The app is designed to be dynamic, ensuring that any updates to the recipe list are reflected on the home page without requiring a page rebuild.

## Current Functionality

### 1. Home Page

-   Displays a list of recipes fetched from an API endpoint.
-   Each recipe in the list includes a title and short description.
-   Users can click on a recipe title to view more details about that recipe.

### 2. Recipe Details Page

-   When a user clicks on a recipe, they are taken to a details page where the full recipe is displayed.
-   The details page includes:
    -   The recipe title.
    -   Full instructions.
    -   A list of ingredients.

## Project Structure

The application follows a modular structure with the Next.js App Router and uses a component-based approach with Semantic UI React for styling.

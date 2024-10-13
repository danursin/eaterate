import { IngredientItem } from "@/types";
import { useCallback } from "react";

interface UseIngredientsOutput {
    searchIngredients: (sw?: string) => Promise<IngredientItem[]>;
}

const useIngredients = (): UseIngredientsOutput => {

    const searchIngredients = useCallback(async (sw = "") => {
        const response = await fetch("/api/ingredient?" + new URLSearchParams({ sw }));
        if (response.ok) {
            const json = await response.json() as IngredientItem[];
            return json;
        } 
        throw new Error(await response.text());
    }, []);


    return {
        searchIngredients
    };

};

export default useIngredients;
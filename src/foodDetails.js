export const fetchFoodDetails = async ({ queryKey }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const apiKey = import.meta.env.VITE_API_KEY;
    const id = queryKey[1];
    const url = `${baseUrl}/food/${id}?api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const foodNutrients = data.foodNutrients.map((item) => ({
            id: item.id,
            amount: item.amount,
            nutrient: {
                name: item.nutrient.name,
                number: item.nutrient.number,
                unitName: item.nutrient.unitName,
                id: item.nutrient.id,
            },
        }));
        return {
            fdcId: data.fdcId,
            foodCode: data.foodCode,
            foodNutrients: foodNutrients,
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

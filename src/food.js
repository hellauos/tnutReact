export const fetchFoodData = async () => {
    const baseUrl = import.meta.env.VITE_BASE_URL
    const apiKey = import.meta.env.VITE_API_KEY
    const url = `${baseUrl}/foods/list?api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const filteredData = data.filter(food => food.dataType !== 'Experimental');

        return filteredData.map(food => ({
            listDataType: food.dataType,
            listFdcId: food.fdcId,
            listDesc: food.description
        }));
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

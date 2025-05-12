import SummaryApi from "../common"

const fetchCategoryWiseProduct = async (category) => {
    try {
        const response = await fetch(SummaryApi.categoryWiseProduct.url, {
            method: SummaryApi.categoryWiseProduct.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                category: category
            })
        });

        // Check if the response is okay (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const dataResponse = await response.json();
        return dataResponse;

    } catch (error) {
        console.error("Error fetching category-wise product:", error);
        throw error; // Rethrow the error if needed
    }
};
export default fetchCategoryWiseProduct
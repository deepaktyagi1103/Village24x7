import SummaryApi from "../common";
import { toast } from 'sonner';

const addToCart = async (
  e?: React.MouseEvent<HTMLButtonElement>,
  id?: string,
  quantity: number = 1
): Promise<any> => {
  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }

  try {
    const response = await fetch(SummaryApi.addToCartProduct.url, {
      method: SummaryApi.addToCartProduct.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        productId: id,
        quantity
      })
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData.message || "Product added to cart");
    } else {
      toast.error(responseData.message || "Failed to add product");
    }

    return responseData;
  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error("Something went wrong. Please try again.");
    return { success: false, error: true };
  }
};

export default addToCart;
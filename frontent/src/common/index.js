const backendDomin = process.env.REACT_APP_BACKEND_URL;
// "http://localhost:8080"
const SummaryApi = {
    signUP : {
        url : `${backendDomin}/api/signup`,
        method : "post",
        credentials: "include",
    },
    signIn : {
        url : `${backendDomin}/api/signin`,
        method : "post",
        credentials: "include",
    },
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomin}/api/userLogout`,
        method : 'get',
        credentials: "include",
    },
    allUser : {
        url : `${backendDomin}/api/all-user`,
        method : 'get'
    },
    updateUser : {
        url : `${backendDomin}/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomin}/api/upload-product`,
        method : 'post'
    },
    allProduct : {
        url : `${backendDomin}/api/get-product`,
        method : 'get'
    },
    updateProduct : {
        url : `${backendDomin}/api/update-product`,
        method : 'post'
    },
    categoryProduct : {
        url : `${backendDomin}/api/get-categoryProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomin}/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomin}/api/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${backendDomin}/api/addto-cart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${backendDomin}/api/countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${backendDomin}/api/view-card-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomin}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomin}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomin}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${backendDomin}/api/filter-product`,
        method : 'post'
    },

    // ✅ Razorpay Payment Endpoints
    payment: {
        url: `${backendDomin}/api/razorpay/order`,
        method: 'post'
    },
    verifyPayment: {
        url: `${backendDomin}/api/razorpay/verify`,
        method: 'post'
    },

    allOrders: {
        url: `${backendDomin}/api/all-orders`,
        method: 'get',
    },
}

export default SummaryApi;

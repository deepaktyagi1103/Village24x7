// // const express = require('express');
// // const router = express.Router();

// // // ✅ Import Middleware
// // const authToken = require("../middleware/authToken");
// // const { protect, admin } = require("../middleware/authMiddleware");

// // // ✅ Import User Controllers
// // const userSignUpController = require("../controller/user/userSignUp");
// // const userSignInController = require("../controller/user/userSignIn");
// // const userDetailsController = require("../controller/user/userDetails");
// // const userLogout = require("../controller/user/userLogout");
// // const allUsers = require('../controller/user/allUsers');
// // const updateUser = require('../controller/user/updateUser');

// // // ✅ Import Product Controllers
// // const UploadProductController = require('../controller/product/uploadProduct');
// // const getProductController = require('../controller/product/getProduct');
// // const updateProductController = require('../controller/product/updateProduct');
// // const getCategoryProduct = require('../controller/product/getCategoryProductOne');
// // const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct');
// // const getProductDetails = require('../controller/product/getProductDetails');
// // const searchProduct = require('../controller/product/searchProduct');
// // const filterProductController = require('../controller/product/filterProduct');

// // // ✅ Import Cart Controllers
// // const addToCartController = require('../controller/user/addToCartController');
// // const countAddToCartProduct = require('../controller/user/countAddToCartProduct');
// // const addToCartViewProduct = require('../controller/user/addToCartViewProduct');
// // const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct');
// // const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct');

// // // ✅ Import Payment & Order Controllers
// // const { createOrder, verifyPayment } = require("../controller/order/paymentController");
// // const getAllOrders = require('../controller/order/getAllOrders');
// // const { getUserOrders } = require('../controller/order/getUserOrders');


// // // ──────────────────────────────────────────────────────────────────────────────
// // // 🟢 USER AUTHENTICATION ROUTES
// // // ──────────────────────────────────────────────────────────────────────────────
// // router.post("/signup", userSignUpController);
// // router.post("/signin", userSignInController);
// // router.get("/user-details", authToken, userDetailsController);
// // router.get("/userLogout", userLogout);

// // // ──────────────────────────────────────────────────────────────────────────────
// // // 🟠 ADMIN PANEL ROUTES
// // // ──────────────────────────────────────────────────────────────────────────────
// // router.get("/all-user", authToken, allUsers);
// // router.post("/update-user", authToken, updateUser);

// // // ──────────────────────────────────────────────────────────────────────────────
// // // 🔵 PRODUCT ROUTES
// // // ──────────────────────────────────────────────────────────────────────────────
// // router.post("/upload-product", authToken, UploadProductController);
// // router.get("/get-product", getProductController);
// // router.post("/update-product", authToken, updateProductController);
// // router.get("/get-categoryProduct", getCategoryProduct);
// // router.post("/category-product", getCategoryWiseProduct);
// // router.post("/product-details", getProductDetails);
// // router.get("/search", searchProduct);
// // router.post("/filter-product", filterProductController);

// // // ──────────────────────────────────────────────────────────────────────────────
// // // 🟣 CART ROUTES
// // // ──────────────────────────────────────────────────────────────────────────────
// // router.post("/addto-cart", authToken, addToCartController);
// // router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
// // router.get("/view-card-product", authToken, addToCartViewProduct);
// // router.post("/update-cart-product", authToken, updateAddToCartProduct);
// // router.post("/delete-cart-product", authToken, deleteAddToCartProduct);

// // // ──────────────────────────────────────────────────────────────────────────────
// // // 🔴 PAYMENT & ORDER ROUTES
// // // ──────────────────────────────────────────────────────────────────────────────
// // router.post("/order", authToken, createOrder);      // Create Order
// // router.post("/verify", authToken, verifyPayment);   // Verify Payment
// // // For admin
// // router.get("/all-orders", authToken, admin, getAllOrders); // already exists

// // // For user
// // router.get("/my-orders", authToken, getUserOrders);


// // module.exports = router;
// const express = require('express');
// const router = express.Router();

// // ✅ Middleware
// const authToken = require("../middleware/authToken");
// const { protect, admin } = require("../middleware/authMiddleware");

// // ✅ USER CONTROLLERS
// const userSignUpController = require("../controller/user/userSignUp");
// const userSignInController = require("../controller/user/userSignIn");
// const userDetailsController = require("../controller/user/userDetails");
// const userLogout = require("../controller/user/userLogout");
// const allUsers = require("../controller/user/allUsers");
// const updateUser = require("../controller/user/updateUser");

// // ✅ PRODUCT CONTROLLERS
// const UploadProductController = require("../controller/product/uploadProduct");
// const getProductController = require("../controller/product/getProduct");
// const updateProductController = require("../controller/product/updateProduct");
// const getCategoryProduct = require("../controller/product/getCategoryProductOne");
// const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
// const getProductDetails = require("../controller/product/getProductDetails");
// const searchProduct = require("../controller/product/searchProduct");
// const filterProductController = require("../controller/product/filterProduct");

// // ✅ CART CONTROLLERS
// const addToCartController = require("../controller/user/addToCartController");
// const countAddToCartProduct = require("../controller/user/countAddToCartProduct");
// const addToCartViewProduct = require("../controller/user/addToCartViewProduct");
// const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct");
// const deleteAddToCartProduct = require("../controller/user/deleteAddToCartProduct");

// // ✅ PAYMENT & ORDER CONTROLLERS
// const { createOrder, verifyPayment } = require("../controller/order/paymentController");
// // const { getUserOrders } = require("../controller/order/getUserOrders");
// const getAllOrders = require("../controller/order/getAllOrders")

// // ─────────────────────────────────────────────────────────────────────────────
// // 🟢 USER AUTH ROUTES
// // ─────────────────────────────────────────────────────────────────────────────
// router.post("/signup", userSignUpController);
// router.post("/signin", userSignInController);
// router.get("/user-details", authToken, userDetailsController);
// router.get("/userLogout", authToken, userLogout);

// // ─────────────────────────────────────────────────────────────────────────────
// // 🟠 ADMIN ROUTES
// // ─────────────────────────────────────────────────────────────────────────────
// router.get("/all-user", authToken, admin, allUsers);
// router.post("/update-user", authToken, updateUser);

// // ─────────────────────────────────────────────────────────────────────────────
// // 🔵 PRODUCT ROUTES
// // ─────────────────────────────────────────────────────────────────────────────
// router.post("/upload-product", authToken, admin, UploadProductController);
// router.get("/get-product", getProductController);
// router.post("/update-product", authToken, admin, updateProductController);
// router.get("/get-categoryProduct", getCategoryProduct);
// router.post("/category-product", getCategoryWiseProduct);
// router.post("/product-details", getProductDetails);
// router.get("/search", searchProduct);
// router.post("/filter-product", filterProductController);

// // ─────────────────────────────────────────────────────────────────────────────
// // 🟣 CART ROUTES
// // ─────────────────────────────────────────────────────────────────────────────
// router.post("/addto-cart", authToken, addToCartController);
// router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
// router.get("/view-card-product", authToken, addToCartViewProduct);
// router.post("/update-cart-product", authToken, updateAddToCartProduct);
// router.post("/delete-cart-product", authToken, deleteAddToCartProduct);

// // ─────────────────────────────────────────────────────────────────────────────
// // 🔴 PAYMENT & ORDER ROUTES
// // ─────────────────────────────────────────────────────────────────────────────
// router.post("/order", authToken, createOrder);           // ✅ Razorpay Create Order
// router.post("/verify", authToken, verifyPayment);        // ✅ Razorpay Verify Order (Ensure frontend sends razorpay_payment_id, razorpay_order_id, razorpay_signature)

// // order details
// router.get("/all-orders",authToken,admin,getAllOrders); // ✅ Admin View All Orders
// // router.get("/my-orders", authToken, getUserOrders);        // ✅ User View Their Orders

// // ─────────────────────────────────────────────────────────────────────────────
// // ✅ EXPORT ROUTES
// // ─────────────────────────────────────────────────────────────────────────────
// module.exports = router;

const express =require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require("../controller/user/userSignIn")
const userDetailsController = require("../controller/user/userDetails")
const authToken = require("../middleware/authToken")
const userLogout = require("../controller/user/userLogout")
const allUsers = require('../controller/user/allUsers')
// const updateUser = require('../controller/updateUser')
// const UploadProductController = require('../controller/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
// const { createOrder } = require('../controller/order/paymentController');
const getAllOrders = require('../controller/order/getAllOrders');
const { createOrder, verifyPayment } = require("../controller/order/paymentController");




router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout", authToken, userLogout)


/// admin panel
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

// product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)





// user add to cart
router.post("/addto-cart",authToken,addToCartController)
router.get ("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

// payment gateway
// router.post("/create-order",authToken,createOrder);
// 🔴 PAYMENT & ORDER ROUTES

router.post("/razorpay/order", authToken, createOrder);       // ✅ Fixed path
router.post("/razorpay/verify", authToken, verifyPayment);    // ✅ Added verify


// order details
router.get("/all-orders",authToken,getAllOrders);





module.exports =router
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { Home } from '../pages/Home'
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import SignUp from '../pages/SignUp';
import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers';
import AllProducts from '../pages/AllProducts';
import CategoryProduct from '../pages/CategoryProduct';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import SearchProduct from '../pages/SearchProduct';
import About from '../pages/About';
import Contact from '../pages/Contact';
import AllOrders from '../pages/AllOrders';
import Success from '../pages/Success';
import Cancel from "../pages/Cancel";
import OrderScreen from '../pages/OrderScreen';
import MyOrders from '../pages/MyOrders'; // ✅ ADD THIS

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "contact",
                element: <Contact />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "sign-up",
                element: <SignUp />
            },
            {
                path: "product-category",
                element: <CategoryProduct />
            },
            {
                path: "product/:id",
                element: <ProductDetails />
            },
            {
                path: "cart",
                element: <Cart />
            },
            {
                path: "Success",
                element: <Success />
            },
            {
                path: "Cancel",
                element: <Cancel />
            },
            {
                path: "search",
                element: <SearchProduct />
            },
            {
                path: "order",
                element: <OrderScreen />
            },
            {
                path: "my-orders", // ✅ NEW ROUTE HERE
                element: <MyOrders />
            },
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "all-users",
                        element: <AllUsers />
                    },
                    {
                        path: "all-products",
                        element: <AllProducts />
                    },
                    {
                        path: "all-orders",
                        element: <AllOrders />
                    },
                ]
            }
        ]
    }
]);

export default router;

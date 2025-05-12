import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Footer2 from './Components/Footer2';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';
import { useEffect, useCallback, useState } from 'react'; // Import useCallback
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import ChatBotComponent from "../src/Components/ChatBot";

function App() {
  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0);

  const fetchUserDetails = async()=>{
      const dataResponse = await fetch(SummaryApi.current_user.url,{
        method : SummaryApi.current_user.method,
        credentials : 'include'
      })

      const dataApi = await dataResponse.json()

      if(dataApi.success){
        dispatch(setUserDetails(dataApi.data))
      }
  }

  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    setCartProductCount(dataApi?.data?.count)  
  }

  useEffect(()=>{  
    /**user Details */
    fetchUserDetails()
    /**user Details cart product */
    // fetchUserAddToCart()
      fetchUserAddToCart()

  },[])
  return (
    <>
      <Context.Provider value={{
          fetchUserDetails, // user detail fetch 
          cartProductCount ,// current user add to cart
          fetchUserAddToCart
      }}>
        <ToastContainer 
          position='top-center'
        />
        
        <Navbar/>
          <main className='min-h-[calc(100vh-120px)] pt-16 '>
          <Outlet/>
          </main>
        <ChatBotComponent/>
          
        <Footer/>
        <Footer2/>
      </Context.Provider>
    </>
  );
}

export default App;
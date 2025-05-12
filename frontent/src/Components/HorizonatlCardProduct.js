import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart'
import Context from '../context';
import { TiShoppingCart } from "react-icons/ti";
import scrollTop from '../helpers/scrollTop';

const HorizonatlCardProduct = ({ category,heading }) => {
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(true)
    const loadingList = new Array(13).fill(null)

    const [scroll,setScroll]= useState(0)
    const scrollElement = useRef()

    const {fetchUserDetails,fetchUserAddToCart} = useContext(Context)

    const handleAddToCart = async(e,id)=>{
        await addToCart(e,id)
        fetchUserAddToCart()
    }

    const fetchData =async() =>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        console.log("horizontal data",categoryProduct.data)

        setData(categoryProduct?.data)
    } 

    useEffect(()=>{
        fetchData()

    },[])

    const scrollRight = ()=>{
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = ()=>{
        scrollElement.current.scrollLeft -= 300
    }




  return (
    <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold py-2'>{heading}</h2>
            <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
            <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block'onClick={scrollLeft}><FaAngleLeft/></button>
            <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block o'onClick={scrollRight}><FaAngleRight/></button>  
             
             { loading ? (
                loadingList.map((product,index)=>{
                    return(
                        <div className='w-full min-w-[200px] md:min-w-[320px] max-w-[200px] md:max-w-[320px] h-36  rounded-sm shadow flex'>
                            <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
                                {/* <img src={product.productImage} alt="" className='object-scale-down h-full hover:scale-110 transition-all'/> */}
                            </div>
                            <div className='p-4 grid w-full gap-2'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse rounded-full p-1'></h2>
                                <p className='capitalize text-slate-500 animate-pulse rounded-full bg-slate-200'></p>
                                <div className='flex gap-2 w-full'>
                                    <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                     <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                </div>
                                <button className='text-sm text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse'></button>
                            </div>
                        </div>
                    )
                })
             ) :(
                data.map((product,index)=>{
                    return(
                        <Link to={"product/"+product?._id} className='w-full min-w-[200px] md:min-w-[320px] max-w-[200px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                            <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                                <img src={product.productImage} alt="" onClick={scrollTop} className='object-scale-down h-full hover:scale-110 transition-all'/>
                            </div>
                            <div className='p-4 grid'>
                                <h2 className='font-montserrat font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                <p className=' font-ultra capitalize text-slate-500'>{product?.category}</p>
                                <div className='flex gap-2'>
                                    <p className='text-emerald-600 font-medium'>{ displayINRCurrency(product?.sellingPrice) }</p>
                                     <p className='text-slate-500 line-through'>{ displayINRCurrency(product?.price)  }</p>
                                </div>
                                    <button className="text-sm font-pacifico flex items-center justify-center bg-gradient-to-r from-teal-300 to-teal-600 text-white font-semibold shadow-md h-[30px] w-[150px] mt-3 transition-transform duration-200 hover:scale-105 bg-green-70 hover:text-white active:translate-x-1 rounded-full" onClick={(e)=>handleAddToCart(e,product?._id)}>Add To Cart
                                    <svg className="w-[12px] h-auto ml-2" viewBox="0 0 576 512">
                                    <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
                                    </button>
                                {/* <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart </button> */}
                            </div>
                        </Link>
                    )
                })

             )
                
            }
            </div>
    </div>
  )
}

export default HorizonatlCardProduct
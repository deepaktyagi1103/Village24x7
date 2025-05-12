import React, { useContext, useState } from 'react'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import SummaryApi from '../common';
import { toast } from 'react-toastify'; 
import Context from '../context/index.js';
import loginIcons from '../assets/login.png';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const dataResponse = await fetch(SummaryApi.signIn.url, {
                method: SummaryApi.signIn.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const dataApi = await dataResponse.json();

            if (dataApi.success) {
                toast.success(dataApi.message);
                navigate('/');
                fetchUserDetails();
                fetchUserAddToCart();
            }

            if (dataApi.error) {
                toast.error(dataApi.message);
            }
        } catch (error) {
            toast.error("Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-organic-50 via-organic-100 to-organic-200 flex items-center justify-center p-6">
            <div className="w-full max-w-6xl flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl animate-fade-in">
                {/* Left Panel - Welcome Message */}
                <div className="lg:w-1/2 bg-gradient-to-br from-organic-700 to-organic-900 p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute w-64 h-64 bg-organic-600 rounded-full opacity-20 -top-20 -left-20"></div>
                    <div className="absolute w-48 h-48 bg-organic-500 rounded-full opacity-20 bottom-10 right-10"></div>
                    
                    <div className="relative z-10 text-green-500">
                        <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                            Welcome Back to 
                            <span className="block text-organic-300 mt-2">Village 24x7!</span>
                        </h1>
                        
                        <p className="text-organic-100 text-lg mb-8 leading-relaxed max-w-md">
                            We're thrilled to have you return to your digital village—a place where community meets convenience, day and night.
                        </p>
                        
                        <div className="hidden lg:flex items-center space-x-4 text-organic-200 mt-12">
                            <div className="w-12 h-1 bg-organic-400 rounded-full"></div>
                            <p className="text-sm">Fresh organic products, always available</p>
                        </div>
                    </div>
                </div>
                
                {/* Right Panel - Login Form */}
                <div className="lg:w-1/2 bg-green-50 p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-organic-50 rounded-full flex items-center justify-center p-4 border-2 border-organic-100">
                            <img src={loginIcons} alt="login" className="w-full h-full object-contain" />
                        </div>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Login</h2>
                    <p className="text-gray-500 text-center mb-8">
                        Don't have an account? 
                        <Link to="/sign-up" className="text-organic-600 hover:text-organic-700 ml-1 font-medium transition-colors">
                            Sign Up
                        </Link>
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail size={18} className="text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={handleOnChange}
                                    autoComplete="email"
                                    required
                                    className="pl-10 w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus: focus:outline-none focus:ring-2 focus:ring-organic-500/50 focus:border-organic-500 transition-all"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <Link to="/forgot-password" className="text-sm text-organic-600 hover:text-organic-500 font-medium transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={18} className="text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
                                    onChange={handleOnChange}
                                    autoComplete="current-password"
                                    required
                                    className="pl-10 w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-organic-500/50 focus:border-organic-500 transition-all"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    {showPassword ? 
                                        <EyeOff size={18} className="text-gray-500" /> : 
                                        <Eye size={18} className="text-gray-500" />
                                    }
                                </button>
                            </div>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-organic-600 to-organic-700 hover:from-organic-700 hover:to-organic-800 text-indigo-600 font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm focus:outline-none focus:ring-2 focus:ring-organic-500 focus:ring-offset-2"
                        >
                            <span>{isLoading ? "Logging in..." : "Login"}</span>
                            {!isLoading && <ArrowRight size={18} />}
                        </button>
                    </form>
                    
                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-500">
                            By logging in, you agree to our 
                            <a href="#" className="text-organic-600 hover:text-organic-700 mx-1">Terms of Service</a>
                            and
                            <a href="#" className="text-organic-600 hover:text-organic-700 mx-1">Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
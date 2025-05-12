import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingCart, Menu, X, MicIcon, Leaf } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import SummaryApi from '../common';
import ROLE from "../common/role";
import Context from '../context';
import scrollTop from '../helpers/scrollTop';
import logo from "../assets/ORGE.png";

const Navbar = () => {
    const user = useSelector((state) => state?.user?.user);
    const dispatch = useDispatch();
    const [menuDisplay, setMenuDisplay] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const context = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();
    const URLSearch = new URLSearchParams(location?.search);
    const searchQuery = URLSearch.get("q") || "";
    const [search, setSearch] = useState(searchQuery);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        // Clear search input when navigating to home page
        if (location.pathname === "/") {
            setSearch("");
        }

        // Add scroll event listener
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    const handleLogout = async () => {
        try {
            const fetchData = await fetch(SummaryApi.logout_user.url, {
                method: SummaryApi.logout_user.method,
                credentials: 'include',
            });

            const data = await fetchData.json();

            if (data.success) {
                toast.success(data.message);
                dispatch(setUserDetails(null));
                navigate("/");
            }

            if (data.error) {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Logout failed. Please try again.");
        }
    };

    const handleSearch = (e) => {
        const { value } = e.target;
        setSearch(value);

        if (value) {
            navigate(`/search?q=${value}`);
        } else {
            navigate("/search");
        }
    };

    const handleVoiceSearch = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.start();

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setSearch(transcript);
            navigate(`/search?q=${transcript}`);
        };

        recognition.onerror = (event) => {
            toast.error("Voice search failed. Please try again.");
        };
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-navbar bg-white/80 shadow-md' : 'bg-gradient-to-r from-organic-50/90 to-organic-100/90'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between h-24">
                    {/* Left Section: Logo & Links */}
                    <div className="flex items-center">
                        <Link to="/" onClick={scrollTop} className="block mr-8">
                            <div className="flex items-center">
                                <img
                                    src={logo}
                                    alt="Organic Store"
                                    className="h-16 w-auto object-contain"
                                />
                                <span className="hidden lg:block ml-2 text-organic-800 font-semibold">
                                    <span className="text-organic-600">Organic</span> Store
                                </span>
                            </div>
                        </Link>
                        <div className="hidden md:flex space-x-8">
                            <Link 
                                to="#" 
                                className="text-base font-medium text-gray-800 hover:text-organic-600 transition-colors duration-200 group relative py-2"
                            >
                                <div className="flex items-center gap-1">
                                    <Leaf className="h-4 w-4 text-organic-500 group-hover:text-organic-600 transition-colors" />
                                    <span>Everything</span>
                                </div>
                                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-organic-500 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <Link 
                                to="#" 
                                className="text-base font-medium text-gray-800 hover:text-organic-600 transition-colors duration-200 group relative py-2"
                            >
                                <div className="flex items-center gap-1">
                                    <Leaf className="h-4 w-4 text-organic-500 group-hover:text-organic-600 transition-colors" />
                                    <span>Groceries</span>
                                </div>
                                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-organic-500 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <Link 
                                to="#" 
                                className="text-base font-medium text-gray-800 hover:text-organic-600 transition-colors duration-200 group relative py-2"
                            >
                                <div className="flex items-center gap-1">
                                    <Leaf className="h-4 w-4 text-organic-500 group-hover:text-organic-600 transition-colors" />
                                    <span>Juice</span>
                                </div>
                                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-organic-500 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </div>
                    </div>

                    {/* Center: Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-md mx-4">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search organic products..."
                                value={search}
                                onChange={handleSearch}
                                className="w-full py-3 pl-5 pr-12 rounded-full bg-white/80 border border-organic-200 focus:outline-none focus:ring-2 focus:ring-organic-500/30 focus:border-organic-500 transition-all shadow-sm"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                                <button 
                                    onClick={handleVoiceSearch} 
                                    className="text-gray-500 hover:text-organic-600 transition-colors p-1.5"
                                    aria-label="Voice search"
                                >
                                    <MicIcon size={18} />
                                </button>
                                <span className="w-px h-5 bg-gray-300"></span>
                                <button 
                                    className="text-organic-600 hover:text-organic-700 transition-colors p-1.5"
                                    aria-label="Search"
                                >
                                    <Search size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Section: Navigation & User Actions */}
                    <div className="flex items-center space-x-6">
                        <div className="hidden md:flex space-x-6">
                            <Link 
                                to="/About" 
                                onClick={scrollTop}
                                className="text-base font-medium text-gray-800 hover:text-organic-600 transition-colors duration-200 group relative py-2"
                            >
                                <span>About</span>
                                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-organic-500 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <Link 
                                to="/Contact" 
                                onClick={scrollTop}
                                className="text-base font-medium text-gray-800 hover:text-organic-600 transition-colors duration-200 group relative py-2"
                            >
                                <span>Contact</span>
                                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-organic-500 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </div>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setMenuDisplay((prev) => !prev)}
                                className="flex items-center focus:outline-none"
                                aria-expanded={menuDisplay}
                                aria-haspopup="true"
                            >
                                {user?._id ? (
                                    user?.profilePic ? (
                                        <img
                                            src={user?.profilePic}
                                            alt={user?.name}
                                            className="w-9 h-9 rounded-full object-cover border-2 border-organic-200 shadow-sm"
                                        />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full flex items-center justify-center bg-organic-100 text-organic-600 border-2 border-organic-200 shadow-sm">
                                            <User  size={18} />
                                        </div>
                                    )
                                ) : (
                                    <div className="w-9 h-9 rounded-full flex items-center justify-center bg-organic-100 text-organic-600 border-2 border-organic-200 shadow-sm">
                                        <User  size={18} />
                                    </div>
                                )}
                            </button>
                            
                            {menuDisplay && (
                                <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg py-2 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none animate-fade-in z-50">
                                    {user?.role === ROLE.ADMIN && (
                                        <Link
                                            to="/admin-panel/all-products"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-organic-50"
                                            onClick={() => setMenuDisplay(false)}
                                        >
                                            <span className="h-6 w-6 flex items-center justify-center rounded-full bg-organic-100 mr-2">
                                                <User  size={14} className="text-organic-600" />
                                            </span>
                                            Admin Panel
                                        </Link>
                                    )}

                                    {user?._id && (
                                        <Link
                                            to="/my-orders"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-organic-50"
                                            onClick={() => setMenuDisplay(false)}
                                        >
                                            <span className="h-6 w-6 flex items-center justify-center rounded-full bg-organic-100 mr-2">
                                                <User  size={14} className="text-organic-600" />
                                            </span>
                                            My Orders
                                        </Link>
                                    )}

                                    {user?._id ? (
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setMenuDisplay(false);
                                            }}
                                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-organic-50"
                                        >
                                            <span className="h-6 w-6 flex items-center justify-center rounded-full bg-organic-100 mr-2">
                                                <User  size={14} className="text-organic-600" />
                                            </span>
                                            Logout
                                        </button>
                                    ) : (
                                        <Link
                                            to="/login"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-organic-50"
                                            onClick={() => setMenuDisplay(false)}
                                        >
                                            <span className="h-6 w-6 flex items-center justify-center rounded-full bg-organic-100 mr-2">
                                                <User  size={14} className="text-organic-600" />
                                            </span>
                                            Login
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Cart */}
                        {user?._id && (
                            <Link
                                to="/cart"
                                onClick={scrollTop}
                                className="relative p-1.5 group"
                            >
                                <ShoppingCart className="h-6 w-6 text-green-800 group-hover:text-organic-600 transition-colors" />
                                {context?.cartProductCount > 0 && (
                                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-green-900 bg-organic-600 rounded-full animate-pulse">
                                        {context?.cartProductCount}
                                    </span>
                                )}
                            </Link>
                        )}

                        {/* Auth Button (Mobile & Desktop) */}
                        <div className="hidden md:block">
                            {user?._id ? (
                                <button
                                    onClick={handleLogout}
                                    className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 border-2 border-emerald-700 rounded-full shadow-md hover:from-green-600 hover:to-emerald-700 hover:shadow-lg transition-all duration-300 ease-in-out                                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 border-2 border-emerald-700 rounded-full shadow-md hover:from-indigo-600 hover:to-purple-700 hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400"
                                >
                                    Login
                                </Link>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <button
                            type="button"
                            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-organic-100 focus:outline-none"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <X className="block h-6 w-6" />
                            ) : (
                                <Menu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden ${isMobileMenuOpen ? 'block animate-fade-in' : 'hidden'}`}>
                <div className="space-y-1 px-4 pb-4 pt-2 bg-white shadow-md">
                    <Link
                        to="#"
                        className="flex items-center py-2.5 text-base font-medium text-gray-800 border-b border-gray-100"
                    >
                        <Leaf className="h-4 w-4 text-organic-500 mr-2" />
                        Everything
                    </Link>
                    <Link
                        to="#"
                        className="flex items-center py-2.5 text-base font-medium text-gray-800 border-b border-gray-100"
                    >
                        <Leaf className="h-4 w-4 text-organic-500 mr-2" />
                        Groceries
                    </Link>
                    <Link
                        to="#"
                        className="flex items-center py-2.5 text-base font-medium text-gray-800 border-b border-gray-100"
                    >
                        <Leaf className="h-4 w-4 text-organic-500 mr-2" />
                        Juice
                    </Link>
                    <Link
                        to="/About"
                        onClick={() => {
                            scrollTop();
                            setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center py-2.5 text-base font-medium text-gray-800 border-b border-gray-100"
                    >
                        About
                    </Link>
                    <Link
                        to="/Contact"
                        onClick={() => {
                            scrollTop();
                            setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center py-2.5 text-base font-medium text-gray-800 border-b border-gray-100"
                    >
                        Contact
                    </Link>
                    
                    {/* Mobile search */}
                    <div className="mt-5 relative">
                        <input
                            type="text"
                            placeholder="Search organic products..."
                            value={search}
                            onChange={handleSearch}
                            className="w-full py-3 pl-4 pr-10 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-organic-500/30 focus:border-organic-500"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                            <button onClick={handleVoiceSearch} className="text-gray-500">
                                <MicIcon size={18} />
                            </button>
                            <span className="w-px h-5 bg-gray-300"></span>
                            <button className="text-organic-600">
                                <Search size={18} />
                            </button>
                        </div>
                    </div>
                    
                    {/* Mobile auth button */}
                    <div className="mt-5">
                        {user?._id ? (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full flex justify-center items-center rounded-xl bg-organic-600 px-4 py-3 text-sm font-medium text-green-500 shadow-sm hover:bg-organic-700 focus:outline-none"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full flex justify-center items-center rounded-xl bg-organic-600 px-4 py-3 text-sm font-medium text-green-500 shadow-sm hover:bg-organic-700 focus:outline-none"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
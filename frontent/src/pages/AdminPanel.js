import React, { useEffect } from 'react';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { Users, Package, ShoppingCart } from "lucide-react";
import { useSelector } from 'react-redux';
import ROLE from '../common/role';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user?.role !== ROLE.ADMIN) {
            navigate("/");
        }
    }, [user, navigate]);

    const navigationLinks = [
        { to: "all-users", label: "Users", icon: <Users className="w-5 h-5" /> },
        { to: "all-products", label: "Products", icon: <Package className="w-5 h-5" /> },
        { to: "all-orders", label: "Orders", icon: <ShoppingCart className="w-5 h-5" /> }
    ];

    return (
        <div className='min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100'>
            <aside className='bg-white w-64 shadow-xl transition-all duration-300 ease-in-out hidden md:block border-r'>
                <div className='h-40 flex justify-center items-center flex-col bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white relative overflow-hidden'>
                    <div className='absolute inset-0 bg-black/20 backdrop-blur-sm'></div>
                    <div className='relative z-10 flex flex-col items-center'>
                        <div className='relative group transition-transform duration-300 hover:scale-110 mb-3'>
                            {user?.profilePic ? (
                                <img 
                                    src={user.profilePic} 
                                    alt="User Profile" 
                                    className="w-20 h-20 rounded-full border-4 border-white/30 shadow-xl object-cover"
                                />
                            ) : (
                                <div className='w-20 h-20 rounded-full bg-white/10 border-4 border-white/30 flex items-center justify-center'>
                                    <span className="text-2xl font-bold">
                                        {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                                    </span>
                                </div>
                            )}
                        </div>
                        <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                        <p className='text-sm text-purple-200'>{user?.role}</p>
                    </div>
                </div>
                
                <nav className='p-4 space-y-2'>
                    {navigationLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                location.pathname.includes(link.to)
                                    ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                            }`}
                        >
                            {link.icon}
                            <span>{link.label}</span>
                        </Link>
                    ))}
                </nav>
            </aside>

            <main className='flex-1 p-6 overflow-x-hidden'>
                <Outlet />
            </main>
        </div>
    );
}

export default AdminPanel;

import React, { useEffect, useState } from 'react';
import SummaryApi from '../common/index';
import { toast } from 'react-toastify';
import { ShoppingCart, Search, Package, AlertCircle, Check, CreditCard, User, DollarSign } from "lucide-react";
import moment from 'moment';

const AdminOrderScreen = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchAllOrders = async () => {
        try {
            setLoading(true);
            const response = await fetch(SummaryApi.allOrders.url, {
                method: SummaryApi.allOrders.method,
                credentials: 'include',
            });
            const dataResponse = await response.json();
            if (dataResponse.success) {
                setOrders(dataResponse.data);
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            toast.error("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const filteredOrders = orders.filter(order => 
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.user?.name && order.user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (order.transactionId && order.transactionId.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const truncateId = (id) => {
        if (!id) return '';
        return id.length > 10 ? `${id.substring(0, 10)}...` : id;
    };

    return (
        <div className='space-y-6 animate-slide-up'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6'>
                <h1 className='text-2xl font-bold text-gray-800'>Admin Order Management</h1>
                <div className='relative'>
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                        type="text"
                        placeholder="Search by ID, customer or transaction..."
                        className="form-input pl-10 w-full md:w-80"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className='bg-white rounded-2xl shadow-sm overflow-hidden'>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full absolute border-4 border-gray-200"></div>
                            <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-primary border-t-transparent"></div>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className='admin-table'>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Products</th>
                                    <th>Amount</th>
                                    <th>Payment</th>
                                    <th>Transaction</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map((order) => (
                                    <tr key={order._id}>
                                        <td className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <Package className="w-4 h-4 text-gray-400" />
                                                {truncateId(order._id)}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-gray-400" />
                                                {order.user?.name || 'Unknown'}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex flex-wrap gap-1">
                                                {order.productId?.slice(0, 2).map((item, idx) => (
                                                    <span key={idx} className="inline-block max-w-[180px] truncate text-xs bg-gray-100 px-2 py-1 rounded-full">
                                                        {item.productName}
                                                    </span>
                                                ))}
                                                {order.productId?.length > 2 && (
                                                    <span className="inline-block text-xs bg-gray-100 px-2 py-1 rounded-full">
                                                        +{order.productId.length - 2} more
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="text-gray-500 text-sm">
                                            {moment(order.createdAt).format('ll')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredOrders.length === 0 && (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                    <ShoppingCart className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-800 mb-1">No orders found</h3>
                                <p className="text-gray-500">Try adjusting your search to find what you're looking for.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminOrderScreen;

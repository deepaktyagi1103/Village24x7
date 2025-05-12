import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';
import { UserCog, Search, Badge, Users } from "lucide-react";
import SummaryApi from '../common';
import ChangeUserRole from '../Components/ChangeUserRole';

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id: "",
    });
    const [searchTerm, setSearchTerm] = useState('');

    const fetchAllUsers = async() => {
        try {
            setLoading(true);
            const fetchData = await fetch(SummaryApi.allUser.url, {
                method: SummaryApi.allUser.method,
                credentials: 'include'
            });
            const dataResponse = await fetchData.json();

            if (dataResponse.success) {
                setAllUsers(dataResponse.data);
            }
            if (dataResponse.error) {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            toast.error("Error fetching users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const filteredUsers = allUser.filter(user => 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='space-y-6 animate-slide-up'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6'>
                <h1 className='text-2xl font-bold text-gray-800'>User Management</h1>
                <div className='relative'>
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                        type="text"
                        placeholder="Search users..."
                        className="form-input pl-10 w-full md:w-64"
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
                                    <th className="w-16 text-center">No.</th>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Created Date</th>
                                    <th className="w-20 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user, index) => (
                                    <tr key={user._id}>
                                        <td className="text-center font-medium text-gray-500">{index + 1}</td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                    {user.name?.charAt(0)?.toUpperCase()}
                                                </div>
                                                <span className="font-medium">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="text-gray-500">{user.email}</td>
                                        <td>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                user.role === 'admin' 
                                                ? 'bg-purple-100 text-purple-800' 
                                                : 'bg-blue-100 text-blue-800'
                                            }`}>
                                                <Badge className="w-3 h-3 mr-1" />
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>{moment(user.createdAt).format('LL')}</td>
                                        <td className="text-center">
                                            <button 
                                                className="btn btn-icon btn-ghost text-gray-500 hover:text-primary"
                                                onClick={() => {
                                                    setUpdateUserDetails(user);
                                                    setOpenUpdateRole(true);
                                                }}
                                                title="Change role"
                                            >
                                                <UserCog className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        {filteredUsers.length === 0 && (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                    <Users className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-800 mb-1">No users found</h3>
                                <p className="text-gray-500">Try adjusting your search to find what you're looking for.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {openUpdateRole && (
                <ChangeUserRole
                    onClose={() => setOpenUpdateRole(false)}
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )}
        </div>
    );
}

export default AllUsers;

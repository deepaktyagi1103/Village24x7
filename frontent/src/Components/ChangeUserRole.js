import React, { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc }) => {
  const [userRole, setUserRole] = useState(role);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
    { value: 'editor', label: 'Editor' },
    { value: 'moderator', label: 'Moderator' }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    if (userRole === role) {
      toast.info("The role is unchanged");
      return;
    }

    setIsSubmitting(true);

    try {
      const fetchResponse = await fetch(SummaryApi.updateUser.url, {
        method: SummaryApi.updateUser.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          userId,
          role: userRole
        })
      });

      const responseData = await fetchResponse.json();

      if (responseData.success) {
        toast.success(responseData.message);
        callFunc();
        handleClose();
      } else {
        toast.error(responseData.message || "Failed to update role");
      }
    } catch (error) {
      toast.error("An error occurred while updating the role");
      console.error("Error updating role:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? 'backdrop-blur-sm bg-black/30' : 'backdrop-blur-none bg-black/0 pointer-events-none'}`}>
      <div 
        className={`bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md transition-all duration-300 transform ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Change User Role
          </h3>
          <button 
            onClick={handleClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">User Information</p>
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
              <div className="flex items-start">
                <span className="text-gray-500 dark:text-gray-400 w-16">Name:</span>
                <span className="text-gray-900 dark:text-white font-medium ml-2">{name}</span>
              </div>
              <div className="flex items-start mt-2">
                <span className="text-gray-500 dark:text-gray-400 w-16">Email:</span>
                <span className="text-gray-900 dark:text-white font-medium ml-2 break-all">{email}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="role-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Role
            </label>
            <div className="relative">
              <select
                id="role-select"
                value={userRole}
                onChange={handleOnChangeSelect}
                className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-shadow duration-200"
              >
                {roles.map((roleOption) => (
                  <option value={roleOption.value} key={roleOption.value}>
                    {roleOption.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <svg className="h-4 w-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={handleClose}
            className="py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateUserRole}
            disabled={isSubmitting || userRole === role}
            className={`inline-flex items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
              ${isSubmitting || userRole === role
                ? 'bg-blue-300 dark:bg-blue-800 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200'
              }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <CheckCircle size={16} className="mr-2" />
                Update Role
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserRole;

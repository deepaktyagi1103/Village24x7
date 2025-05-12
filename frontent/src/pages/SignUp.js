import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import loginIcons from "../assets/login.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import imageTobase64 from "../helpers/imagetobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { motion } from "framer-motion"; // Import Framer Motion

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setData((prev) => ({
      ...prev,
      profilePic: imagePic,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await dataResponse.json();
      if (responseData.success) {
        toast.success(responseData.message);
        navigate("/login");
      }
      if (responseData.error) {
        toast.error(responseData.message);
      }
    } else {
      toast.error("Passwords do not match!");
    }
  };

  return (
    <section id="signup "className="bg-gradient-to-r from-green-50 to-pink-200">
      <motion.div
        className="mx-auto container p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="bg-gradient-to-r from-green-50 to-indigo-100 shadow-xl rounded-lg p-5 w-full max-w-md mx-auto">
          {/* Profile Picture */}
          <motion.div
            className="w-24 h-24 mx-auto relative overflow-hidden rounded-full border-4 border-gray-500"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, bounce: 0.4 }}
          >
            <img
              src={data.profilePic || loginIcons}
              className="rounded-full"
              alt="login icons"
            />
            <form>
              <label>
                <motion.div
                  className="text-sm bg-opacity-80 bg-slate-200 py-2 text-center absolute bottom-0 w-full cursor-pointer"
                  whileHover={{ backgroundColor: "#f87171" }}
                  whileTap={{ scale: 0.9 }}
                >
                  Upload Pic
                </motion.div>
                <input
                  className="hidden"
                  type="file"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </motion.div>

          {/* Form */}
          <form
            className="pt-6 flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            {/* Name */}
            <motion.div
              className="grid"
              initial={{ x: "-100vw" }}
              animate={{ x: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
            >
              <label>Name:</label>
              <div className="bg-slate-100 p-2 rounded-md">
                <input
                  type="text"
                  placeholder="Enter Your Full Name"
                  name="name"
                  value={data.name}
                  required
                  onChange={handleOnChange}
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              className="grid"
              initial={{ x: "100vw" }}
              animate={{ x: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
            >
              <label>Email:</label>
              <div className="bg-slate-100 p-2 rounded-md">
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={data.email}
                  required
                  onChange={handleOnChange}
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <label>Password:</label>
              <div className="bg-slate-100 p-2 rounded-md flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  name="password"
                  value={data.password}
                  required
                  onChange={handleOnChange}
                  className="w-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </motion.div>

            {/* Confirm Password */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <label>Confirm Password:</label>
              <div className="bg-slate-100 p-2 rounded-md flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  required
                  onChange={handleOnChange}
                  className="w-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full mx-auto mt-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Sign Up
            </motion.button>
          </form>

          {/* Footer */}
          <motion.p
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-sky-600 hover:text-sky-700 hover:underline"
            >
              Login
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

export default SignUp;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { PiEye, PiEyeClosedLight } from "react-icons/pi";
// import { addAuth } from '../redux/slices/authSlice';
// import { useDispatch } from 'react-redux';
// import { checkValidSignInFrom } from '../utils/validate';

// const Login = () => {
//     const [email,setEmail] = useState('')
//     const [password, setPassword] = useState("");
// 	const [load, setLoad] = useState("");
// 	const [isShow, setIsShow] = useState(false);
// 	const navigate = useNavigate();
//     const dispatch = useDispatch()

//     const loginUser =(e) =>{
//         toast.loading("Wait until you SignIn");
//         e.preventDefault();
//         setLoad(true);
//         fetch("http://localhost:3000/api/signin",{
//             method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({
// 				email: email,
// 				password: password,

//         })
//     })
//     .then((response) => response.json())
// 			.then((json) => {
// 				setLoad("");
// 				e.target.disabled = false;
// 				toast.dismiss();
// 				if (json.token) {
// 					localStorage.setItem("token", json.token);
// 					dispatch(addAuth(json.data));
// 					navigate("/");
// 					toast.success(json?.message);
// 				} else {
// 					toast.error(json?.message);
// 				}
// 			})
// 			.catch((error) => {
// 				console.error("Error:", error);
// 				setLoad("");
// 				toast.dismiss();
// 				toast.error("Error : " + error.code);
// 				e.target.disabled = false;
// 			});

//     }
//     const handleLogin = (e) => {
// 		if (email && password) {
// 			const validError = checkValidSignInFrom(email, password);
// 			if (validError) {
// 				toast.error(validError);
// 				return;
// 			}
// 			setLoad("Loading...");
// 			loginUser(e);
// 		} else {
// 			toast.error("Required: All Fields");
// 		}
// 	};
//     return (
//         <div className="flex flex-col items-center my-6 text-slate-300 min-h-[80vh]">
//             <div className="p-3 w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] min-w-72 max-w-[1000px] border border-slate-400 bg-slate-800 rounded-lg h-fit  mt-5 transition-all">
//             <h2 className="text-2xl underline underline-offset-8 font-semibold text-slate-100 w-full text-center mb-4">
// 					SignIn ChatApp
// 				</h2>
//                 <form className="w-full flex justify-between flex-col">
//                 <h3 className="text-xl font-semibold p-1">
// 						Enter Email Address
// 					</h3>
//                     <input
// 						className="w-full border border-slate-700 my-3 py-4 px-8 rounded-full flex justify-between bg-white text-black "
// 						type="email"
// 						placeholder="Enter Email Address"
// 						name="email"
// 						value={email}
// 						onChange={(e) => setEmail(e.target.value)}
// 					/>
// 					<h3 className="text-xl font-semibold p-1">
// 						Enter Password
// 					</h3>
// 					<div className="relative">
// 						<input
// 							className="w-full border border-slate-700 my-3 py-4 px-8 rounded-full flex justify-between bg-white text-black "
// 							type={isShow ? "text" : "password"}
// 							placeholder="Enter Password"
// 							name="password"
// 							value={password}
// 							onChange={(e) => setPassword(e.target.value)}
// 						/>
//                         <span
// 							onClick={() => setIsShow(!isShow)}
// 							className="cursor-pointer text-black/80 absolute right-5 top-8"
// 						>
// 							{isShow ? (
// 								<PiEyeClosedLight fontSize={22} />
// 							) : (
// 								<PiEye fontSize={22} />
// 							)}
// 						</span>
//                     </div>
//                     <button className="w-full text-white py-3 px-6 rounded-full bg-slate-600 hover:bg-slate-700 transition-all"
//                     onClick={(e) => {
//                         e.preventDefault();
//                         handleLogin(e);
//                     }}>
//                        {load == "" ? "SignIn" : load}
//                     </button>
//                     <div className="w-full flex items-center mt-3">
// 						<div className="w-full h-[1px] bg-slate-600"></div>
// 						<Link to={"#"}>
// 							<div className="p-3 font-semibold text-md hover:text-white whitespace-nowrap">
// 								Forgot Password
// 							</div>
// 						</Link>
// 						<div className="w-full h-[1px] bg-slate-600"></div>
// 					</div>
// 					<div className="w-full flex items-center my-3">
// 						<div className="w-full h-[1px] bg-slate-600"></div>
// 						<Link to="/signup">
// 							<div className="p-3 font-semibold text-md hover:text-white">
// 								SignUp
// 							</div>
// 						</Link>
// 						<div className="w-full h-[1px] bg-slate-600"></div>
// 					</div>
//                 </form>

//             </div>

//         </div>
//     );
// };

// export default Login;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { PiEye, PiEyeClosedLight } from "react-icons/pi";
import { addAuth } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginUser = async (values, actions) => {
    toast.loading("Wait until you SignIn");
    try {
      const response = await fetch("https://chat-sync-backend-gin7.onrender.com/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const json = await response.json();
      actions.setSubmitting(false);
      toast.dismiss();
      if (json.token) {
        localStorage.setItem("token", json.token);
        dispatch(addAuth(json.data));
        navigate("/");
        toast.success(json?.message);
      } else {
        toast.error(json?.message);
      }
    } catch (error) {
      console.error("Error:", error);
      actions.setSubmitting(false);
      toast.dismiss();
      toast.error("Error : " + error.code);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, actions) => {
      loginUser(values, actions);
    },
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = "Required";
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Required";
      }

      return errors;
    },
  });

  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    formik;

  const [isShow, setIsShow] = React.useState(false);

  const handleTogglePasswordVisibility = () => {
    setIsShow(!isShow);
  };

  return (
    <div className="flex flex-col items-center my-6  min-h-[80vh]">
      <div className="p-3 w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] min-w-72 max-w-[1000px] border border-slate-800  rounded-lg h-fit  mt-5 transition-all">
        <h2 className="text-2xl underline underline-offset-8 font-semibold  w-full text-center mb-4">
          SignIn ChatApp
        </h2>

        <form
          className="w-full flex justify-between flex-col"
          onSubmit={handleSubmit}
        >
          <h3 className="text-xl font-semibold p-1">Enter Email Address</h3>
          <input
            className="w-full border border-slate-700 my-3 py-4 px-8 rounded-full flex justify-between bg-white text-black "
            type="email"
            placeholder="Enter Email Address"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && touched.email && (
            <div className="text-red-500">{errors.email}</div>
          )}

          <h3 className="text-xl font-semibold p-1">Enter Password</h3>
          <div className="relative">
            <input
              className="w-full border border-slate-700 my-3 py-4 px-8 rounded-full flex justify-between bg-white text-black "
              type={isShow ? "text" : "password"}
              placeholder="Enter Password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            <span
              onClick={handleTogglePasswordVisibility}
              className="cursor-pointer text-black/80 absolute right-5 top-8"
            >
              {isShow ? (
                <PiEyeClosedLight fontSize={22} />
              ) : (
                <PiEye fontSize={22} />
              )}
            </span>
          </div>
          {errors.password && touched.password && (
            <div className="text-red-500">{errors.password}</div>
          )}

          <button
            type="submit"
            className="w-full text-white mt-2 py-3 px-6 rounded-full bg-yellow-800 hover:bg-orange-600 transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>

          <div className="w-full flex items-center mt-3"></div>
          <div className="w-full flex items-center my-3">
            <div className="w-full h-[1px] bg-slate-600"></div>
            <Link to="/signup">
              <div className="p-3 font-semibold text-md hover:text-white">
                SignUp
              </div>
            </Link>
            <div className="w-full h-[1px] bg-slate-600"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

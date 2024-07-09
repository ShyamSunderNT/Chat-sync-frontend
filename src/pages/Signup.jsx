import React, { useState } from "react";
import { PiEye, PiEyeClosedLight } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);

  // Formik form handling
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    toast.loading("Wait until you SignUp");
    fetch("https://chat-sync-backend-gin7.onrender.com/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((json) => {
        toast.dismiss();
        if (json.token) {
          navigate("/signin");
          toast.success(json?.message);
        } else {
          toast.error(json?.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.dismiss();
        toast.error("Error : " + error.code);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="flex flex-col items-center my-6 min-h-[80vh]">
      <div className="p-3 w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] min-w-72 max-w-[1000px] border border-slate-400 rounded-lg h-fit mt-5 transition-all">
        <h2 className="text-2xl underline underline-offset-8 font-semibold w-full text-center mb-4">
          SignUp Chat-Sync
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full flex justify-between flex-col">
              <h3 className="text-xl font-semibold p-1">Enter First Name</h3>
              <Field
                type="text"
                name="firstName"
                className="w-full border border-slate-700 my-3 py-4 px-8 rounded-full flex justify-between bg-white text-black"
                placeholder="Enter First Name"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500"
              />

              <h3 className="text-xl font-semibold p-1">Enter Last Name</h3>
              <Field
                type="text"
                name="lastName"
                className="w-full border border-slate-700 my-3 py-4 px-8 rounded-full flex justify-between bg-white text-black"
                placeholder="Enter Last Name"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500"
              />

              <h3 className="text-xl font-semibold p-1">Enter Email Address</h3>
              <Field
                type="email"
                name="email"
                className="w-full border border-slate-700 my-3 py-4 px-8 rounded-full flex justify-between bg-white text-black"
                placeholder="Enter Email Address"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />

              <h3 className="text-xl font-semibold p-1">Enter Password</h3>
              <div className="relative">
                <Field
                  type={isShow ? "text" : "password"}
                  name="password"
                  className="w-full border border-slate-700 my-3 py-4 px-8 rounded-full flex justify-between bg-white text-black"
                  placeholder="Enter Password"
                />
                <span
                  onClick={() => setIsShow(!isShow)}
                  className="cursor-pointer text-black/80 absolute right-5 top-8"
                >
                  {isShow ? (
                    <PiEyeClosedLight fontSize={22} />
                  ) : (
                    <PiEye fontSize={22} />
                  )}
                </span>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />

              <button
                type="submit"
                className="disabled:opacity-50 disabled:cursor-not-allowed w-full font-semibold hover:bg-green-600 rounded-full px-5 py-4 mt-5 text-lg border border-slate-400 text-stone-50 hover:text-white bg-red-600 transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>

              <div className="w-full flex items-center my-3">
                <div className="w-full h-[1px] bg-slate-600"></div>
                <Link to="/signin">
                  <div className="p-3 font-semibold text-md hover:text-white">
                    SignIn
                  </div>
                </Link>
                <div className="w-full h-[1px] bg-slate-600"></div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;

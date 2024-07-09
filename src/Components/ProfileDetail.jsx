import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  setProfileDetail,
  updateUserProfileFailure,
  updateUserProfileStart,
  updateUserProfileSuccess,
} from "../redux/slices/conditionSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ProfileDetail = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth);
  const isLoading = useSelector((store) => store.condition.isLoading);

  const [editMode, setEditMode] = useState(false);

  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="flex -m-2 sm:-m-4 flex-col items-center my-6 text-slate-300 min-h-screen w-full fixed top-0 justify-center z-50">
      <div className="p-3 pt-4 w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] min-w-72 max-w-[1000px] border  bg-red-400 rounded-lg h-fit mt-5 transition-all relative">
        <h2 className="text-2xl underline underline-offset-8 font-semibold text-slate-100 w-full text-center mb-2">
          Profile
        </h2>
        {editMode ? (
          <Formik
            initialValues={{
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            }}
            validationSchema={Yup.object({
              firstName: Yup.string().required("First Name is required"),
              lastName: Yup.string().required("Last Name is required"),
              email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(updateUserProfileStart()); // Set loading state
              // Send updated details to backend
              fetch("http://localhost:3000/api/profile", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(values),
              })
                .then((response) => response.json())
                .then((data) => {
                  if (data.success) {
                    dispatch(updateUserProfileSuccess()); // Dispatch success action
                    alert("Profile updated successfully!");
                    setEditMode(false); // Exit edit mode
                  } else {
                    dispatch(updateUserProfileFailure()); // Dispatch failure action
                    alert("Failed to update profile. Please try again.");
                  }
                })
                .catch((error) => {
                  dispatch(updateUserProfileFailure()); // Dispatch failure action on error
                  console.error("Error updating profile:", error);
                  alert("An error occurred while updating profile.");
                })
                .finally(() => {
                  setSubmitting(false); // Set submitting state to false
                });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="w-full py-4 justify-evenly flex flex-wrap items-center gap-3">
                  <div className="self-end">
                    <Field
                      type="text"
                      name="firstName"
                      className="w-full border border-slate-700 my-3 py-2 px-4 rounded-full bg-white text-black"
                      placeholder="Enter First Name"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500"
                    />
                    <Field
                      type="text"
                      name="lastName"
                      className="w-full border border-slate-700 my-3 py-2 px-4 rounded-full bg-white text-black"
                      placeholder="Enter Last Name"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500"
                    />
                    <Field
                      type="email"
                      name="email"
                      className="w-full border border-slate-700 my-3 py-2 px-4 rounded-full bg-white text-black"
                      placeholder="Enter Email Address"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full mt-3 hover:bg-blue-700 transition-all"
                      disabled={isLoading || isSubmitting}
                    >
                      {isLoading || isSubmitting
                        ? "Updating..."
                        : "Save Changes"}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <div className="w-full py-4 justify-evenly flex flex-wrap items-center gap-3">
            <div className="self-end">
              <h3 className="text-xl font-semibold p-1">
                Name : {user.firstName} {user.lastName}
              </h3>
              <h3 className="text-xl font-semibold p-1">
                Email : {user.email}
              </h3>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mt-3"
              >
                Logout
              </button>
            </div>
            <div className="absolute bottom-4 right-4">
              <button
                onClick={toggleEditMode}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mt-3"
              >
                Edit
              </button>
            </div>
          </div>
        )}
        <div
          title="Close"
          onClick={() => dispatch(setProfileDetail())}
          className="bg-black/15 hover:bg-black/50 h-7 w-7 rounded-md flex items-center justify-center absolute top-2 right-3 cursor-pointer"
        >
          <MdOutlineClose size={22} />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;

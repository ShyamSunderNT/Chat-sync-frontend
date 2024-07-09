import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaPaperPlane } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSendLoading } from "../../redux/slices/conditionSlice";
import { addNewMessageId } from "../../redux/slices/messageSlice";
import { LuLoader } from "react-icons/lu";

const MessageSend = ({ chatId }) => {
  const dispatch = useDispatch();
  const isSendLoading = useSelector((store) => store?.condition?.isSendLoading);

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: Yup.object({
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        dispatch(setSendLoading(true));
        const token = localStorage.getItem("token");
        const response = await fetch("https://chat-sync-backend-gin7.onrender.com/api/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: values.message.trim(),
            chatId: chatId,
          }),
        });
        const data = await response.json();
        dispatch(addNewMessageId(data?.data?._id));
        resetForm();
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        dispatch(setSendLoading(false));
      }
    },
  });

  return (
    <form
      className="w-full flex items-center gap-1 h-[7vh] p-3 bg-emerald-800 text-white"
      onSubmit={formik.handleSubmit}
    >
      <input
        type="text"
        name="message"
        className="outline-none p-2 w-full bg-transparent"
        placeholder="Write a message"
        value={formik.values.message}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <span className="flex justify-center items-center">
        {formik.values.message && !formik.errors.message ? (
          isSendLoading ? (
            <button
              className="outline-none p-2 border-slate-500 border-l"
              disabled
            >
              <LuLoader
                title="loading..."
                fontSize={18}
                className="animate-spin"
              />
            </button>
          ) : (
            <button
              type="submit"
              className="outline-none p-2 border-slate-500 border-l"
            >
              <FaPaperPlane
                title="Send"
                size={18}
                className="active:scale-75 hover:text-green-400"
              />
            </button>
          )
        ) : null}
      </span>
      {formik.touched.message && formik.errors.message ? (
        <div className="text-red-500">{formik.errors.message}</div>
      ) : null}
    </form>
  );
};

export default MessageSend;

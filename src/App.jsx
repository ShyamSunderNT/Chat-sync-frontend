import React, { useEffect, useState } from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Header from './Components/Header';
import Home from './pages/Home';
import Signup from './pages/Signup';
import  SignIn from "./pages/Login"
import Error from './pages/Error';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider, useDispatch, useSelector } from 'react-redux';
import ProfileDetail from './Components/ProfileDetail';
import Loading from './Components/loading/Loading';
import GroupChatBox from './Components/chatComp/GroupChat';
import store from './redux/store';


const Applayout = () => {
  const [toastPosition, setToastPosition] = useState("bottom-left");
	const isProfileDetails = useSelector(
		(store) => store.condition.isProfileDetail
	);
	const isGroupChatBox = useSelector(
		(store) => store.condition.isGroupChatBox
	);
  const isLoading = useSelector((store) => store.condition.isLoading);
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 600) {
				setToastPosition("bottom-left");
			} else {
				setToastPosition("top-left");
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
  return (
    <div>
    <ToastContainer/>
    <Header />
    <div className="h-16 md:h-20"></div>
    <div className="min-h-[85vh] p-2 sm:p-4  bg-gradient-to-tr to-amber-400 via-cyan-400 from-cyan-500">
      <Outlet />
      {isProfileDetails && <ProfileDetail />}
      {isGroupChatBox && <GroupChatBox />}
    </div>
    {isLoading && <Loading />}
    
  </div>
  );
};
const routers = createBrowserRouter([
	{
		path: "/",
		element: <Applayout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/signup",
				element: <Signup />,
			},
			{
				path: "/signin",
				element: <SignIn />,
			},
			{
				path: "*",
				element: <Error />,
			},
		],
		errorElement: <Error />,
	},
]);

function App() {
	return (
		<Provider store={store}>
			<RouterProvider router={routers} />
		</Provider>
	);
}

export default App;
// import React, { useEffect, useRef } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import Logo from '../assets/cslogo.jpg';
// import { useDispatch, useSelector } from 'react-redux';
// import { addAuth } from '../redux/slices/authSlice';
// import handleScrollTop from '../utils/handleScrolTop';
// import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
// import { setHeaderMenu, setProfileDetail } from '../redux/slices/conditionSlice';
// import { IoLogOutOutline } from "react-icons/io5";
// import { PiUserCircleLight } from "react-icons/pi"

// const Header = () => {
//     const user = useSelector((store) => store.auth);
// 	const isHeaderMenu = useSelector((store) => store?.condition?.isHeaderMenu);
// 	const dispatch = useDispatch();
// 	const navigate = useNavigate();
// 	const token = localStorage.getItem("token");
//     const getAuthUser = (token) => {
// 		fetch(`http://localhost:3000/api/profile`, {
// 			method: "GET",
// 			headers: {
// 				"Content-Type": "application/json",
// 				Authorization: `Bearer ${token}`,
// 			},
// 		})
// 			.then((res) => res.json())
// 			.then((json) => {
// 				dispatch(addAuth(json.data));
// 			})
// 			.catch((err) => console.log(err));
// 	};
//     useEffect(() => {
// 		if (token) {
// 			getAuthUser(token);
// 			navigate("/");
// 		} else {
// 			navigate("/signin");
// 		}
// 		dispatch(setHeaderMenu(false));
// 	}, [token]);
//     const { pathname } = useLocation();
// 	useEffect(() => {
// 		if (user) {
// 			navigate("/");
// 		} else if (pathname !== "/signin" && pathname !== "/signup") {
// 			navigate("/signin");
// 		}
// 		handleScrollTop();
// 	}, [pathname, user]);

// 	const handleLogout = () => {
// 		localStorage.removeItem("token");
// 		window.location.reload();
// 		navigate("/signin");
// 	};
//     useEffect(() => {
// 		var prevScrollPos = window.pageYOffset;
// 		const handleScroll = () => {
// 			var currentScrollPos = window.pageYOffset;
// 			if (prevScrollPos < currentScrollPos && currentScrollPos > 80) {
// 				document.getElementById("header").classList.add("hiddenbox");
// 			} else {
// 				document.getElementById("header").classList.remove("hiddenbox");
// 			}
// 			prevScrollPos = currentScrollPos;
// 		};
// 		window.addEventListener("scroll", handleScroll);
// 		return () => {
// 			window.removeEventListener("scroll", handleScroll);
// 		};
// 	}, []);
//     const headerMenuBox = useRef(null);
// 	const headerUserBox = useRef(null);
// 	// headerMenuBox outside click handler
// 	const handleClickOutside = (event) => {
// 		if (
// 			headerMenuBox.current &&
// 			!headerUserBox?.current?.contains(event.target) &&
// 			!headerMenuBox.current.contains(event.target)
// 		) {
// 			dispatch(setHeaderMenu(false));
// 		}
// 	};

// 	// add && remove events according to isHeaderMenu
// 	useEffect(() => {
// 		if (isHeaderMenu) {
// 			document.addEventListener("mousedown", handleClickOutside);
// 		} else {
// 			document.removeEventListener("mousedown", handleClickOutside);
// 		}
// 		return () => {
// 			document.removeEventListener("mousedown", handleClickOutside);
// 		};
// 	}, [isHeaderMenu]);

//     return (
//         <div
//         id="header"
//         className="w-full h-16 fixed top-0 z-50 md:h-20  shadow-inner flex justify-between items-center p-4 font-semibold bg-rose-300 text-white"
//     >
//         <div className="flex items-center justify-start gap-2">
//             <Link to={"/"}>
//                 <img
//                     src={Logo}
//                     alt="Chatsync"
//                     className="h-12 w-12 rounded-tr-full rounded-tl-full rounded-br-full"
//                 />
//             </Link>
//             <Link to={"/"}>
//                 <span className="px-2 py-1 bg-gradient-to-r from-amber-400 to-red-500 rounded-lg text-white">Chat-sync</span>
//             </Link>
//         </div>

//         {user ? (
//             <div className="flex flex-nowrap items-center">
//                 <span className="whitespace-nowrap ml-2">
//                     Hi, {user.firstName}
//                 </span>
//                 <div
//                     ref={headerUserBox}
//                     onClick={(e) => {
//                         e.preventDefault();
//                         dispatch(setHeaderMenu(!isHeaderMenu));
//                     }}
//                     className="flex flex-nowrap transition-all items-center ml-3  border border-red-500 rounded-full bg-gradient-to-tr to-amber-400 text-black via-white  from-slate-800 hover:bg-gradient-to-br shadow-sm  cursor-pointer"
//                 >
//                     <img
//                         src={user.image}
//                         alt="gg"
//                         className="w-10 h-10 rounded-full"
//                     />
//                     <span className="m-2">
//                         {isHeaderMenu ? (
//                             <MdKeyboardArrowDown fontSize={20} />
//                         ) : (
//                             <MdKeyboardArrowUp fontSize={20} />
//                         )}
//                     </span>
//                 </div>
//                 {isHeaderMenu && (
//                     <div
//                         ref={headerMenuBox}
//                         className="border border-slate-500 text-white w-40 h-24 py-2 flex flex-col justify-center rounded-md items-center gap-1 absolute top-16 right-4 z-40 bg-pink-700 "
//                     >
//                         <div
//                             onClick={() => {
//                                 dispatch(setHeaderMenu(false));
//                                 dispatch(setProfileDetail());
//                             }}
//                             className="flex flex-nowrap items-center w-full h-fit cursor-pointer justify-center hover:bg-violet-600 hover:text-black p-1"
//                         >
//                             <div className="flex items-center justify-between w-2/4">
//                                 <PiUserCircleLight fontSize={23} />
//                                 <span>Profile</span>
//                             </div>
//                         </div>
//                         <div
//                             className="flex flex-nowrap items-center w-full h-fit cursor-pointer justify-center  hover:bg-violet-600 hover:text-black p-1"
//                             onClick={handleLogout}
//                         >
//                             <div className="flex items-center justify-between w-2/4">
//                                 <IoLogOutOutline fontSize={21} />
//                                 <span>Logout</span>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         ) : (
//             <Link to={"/signin"}>
//                 <button className="py-2 px-4 border border-slate-400 rounded-full bg-gradient-to-tr to-slate-800 text-black via-white  from-slate-800 hover:bg-gradient-to-br shadow-sm hover:shadow-white">
//                     SingIn
//                 </button>
//             </Link>
//         )}
//     </div>
//     );
// };

// export default Header;

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { addAuth } from '../redux/slices/authSlice';

import { MdKeyboardDoubleArrowDown,MdKeyboardDoubleArrowUp } from "react-icons/md";

import { setHeaderMenu, setProfileDetail } from '../redux/slices/conditionSlice';
import { IoLogOutOutline } from "react-icons/io5";

import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
    const user = useSelector((store) => store.auth);
    const isHeaderMenu = useSelector((store) => store?.condition?.isHeaderMenu);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const getAuthUser = (token) => {
        fetch(`http://localhost:3000/api/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.json())
        .then((json) => {
            dispatch(addAuth(json.data));
        })
        .catch((err) => console.log(err));
    };

    React.useEffect(() => {
        if (token) {
            getAuthUser(token);
            navigate("/");
        } else {
            navigate("/signin");
        }
        dispatch(setHeaderMenu(false));
    }, [token]);

    const { pathname } = useLocation();
    React.useEffect(() => {
        if (user) {
            navigate("/");
        } else if (pathname !== "/signin" && pathname !== "/signup") {
            navigate("/signin");
        }
        handleScrollTop();
    }, [pathname, user]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
        navigate("/signin");
    };

    const headerMenuBox = React.useRef(null);
    const headerUserBox = React.useRef(null);

    // headerMenuBox outside click handler
    const handleClickOutside = (event) => {
        if (
            headerMenuBox.current &&
            !headerUserBox?.current?.contains(event.target) &&
            !headerMenuBox.current.contains(event.target)
        ) {
            dispatch(setHeaderMenu(false));
        }
    };

    // add && remove events according to isHeaderMenu
    React.useEffect(() => {
        if (isHeaderMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isHeaderMenu]);

    return (
        <div id="header" className="w-full h-16 fixed top-0 z-50 md:h-20 shadow-inner flex justify-between items-center p-4 font-semibold bg-zinc-900 text-white">
            <div className="flex items-center justify-start gap-2">
                
                <Link to={"/"}>
                    <span className="px-2 py-1 bg-gradient-to-r from-amber-400 to-red-500 rounded-lg text-white">Chat-sync</span>
                </Link>
            </div>

            {user ? (
                <div className="flex flex-nowrap items-center">
                    <span className="whitespace-nowrap ml-2">
                        Hi, {user.firstName}
                    </span>
                    <div
                        ref={headerUserBox}
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch(setHeaderMenu(!isHeaderMenu));
                        }}
                        className="flex flex-nowrap transition-all items-center ml-3  border border-red-500 rounded-full bg-gradient-to-tr to-amber-400 text-black via-white  from-slate-800 hover:bg-gradient-to-br shadow-sm  cursor-pointer"
                    >
                        <img
                            src={user.image}
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <span className="m-2">
                            {isHeaderMenu ? (
                                <MdKeyboardDoubleArrowDown fontSize={20} />
                            ) : (
                                <MdKeyboardDoubleArrowUp fontSize={20} />
                            )}
                        </span>
                    </div>
                    {isHeaderMenu && (
                        <div
                            ref={headerMenuBox}
                            className="border border-slate-500 text-white w-40 h-24 py-2 flex flex-col justify-center rounded-md items-center gap-1 absolute top-16 right-4 z-40 bg-pink-700 "
                        >
                            <div
                                onClick={() => {
                                    dispatch(setHeaderMenu(false));
                                    dispatch(setProfileDetail());
                                }}
                                className="flex flex-nowrap items-center w-full h-fit cursor-pointer justify-center hover:bg-violet-600 hover:text-black p-1"
                            >
                                <div className="flex items-center justify-between w-2/4">
                                    <FaRegUserCircle fontSize={23} />
                                    <span>Profile</span>
                                </div>
                            </div>
                            <div
                                className="flex flex-nowrap items-center w-full h-fit cursor-pointer justify-center  hover:bg-violet-600 hover:text-black p-1"
                                onClick={handleLogout}
                            >
                                <div className="flex items-center justify-between w-2/4">
                                    <IoLogOutOutline fontSize={21} />
                                    <span>Logout</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <Link to="/signin" className="text-white">
                    Sign In
                </Link>
            )}
        </div>
    );
};

export default Header;
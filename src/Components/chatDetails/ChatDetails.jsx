import React, { useState } from 'react';
import { CiCircleInfo } from "react-icons/ci";
import { HiOutlineUsers } from "react-icons/hi2";
import Overview from './Overview';
import Member from './Member';

import { useSelector } from 'react-redux';



const ChatDetailsBox = () => {
    const selectedChat = useSelector((store) => store?.myChat?.selectedChat);
	const [detailView, setDetailView] = useState("overview");
    return (
        <>
			<div className="w-fit h-[60vh] p-2 flex flex-col gap-1.5 bg-green-700">
				<div
					className={`flex gap-2 items-center p-1 text-white rounded-md px-2 cursor-pointer ${
						detailView === "overview"
							? "bg-yellow-500"
							: "bg-lime-600"
					}`}
					onClick={() => setDetailView("overview")}
					title="Overview"
				>
					<CiCircleInfo fontSize={18} />
					<span className="hidden sm:block">Overview</span>
				</div>
				{selectedChat?.isGroupChat && (
					<div
						className={`flex gap-2 items-center p-1 text-white rounded-md px-2 cursor-pointer ${
							detailView === "members"
								? "bg-blue-950"
								: "bg-slate-800"
						}`}
						onClick={() => setDetailView("members")}
						title="Member"
					>
						<HiOutlineUsers fontSize={18} />
						<span className="hidden sm:block">Members</span>
					</div>
				)}
				
			</div>
			<div className="w-full h-[60vh]">
				{detailView === "overview" && <Overview />}
				{detailView === "members" && <Member />}
				
			</div>
		</>
    );
};

export default ChatDetailsBox;
import React from 'react';
import { MdChat } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import UserSearch from '../Components/chatComp/UserSearch';
import MyChat from '../Components/chatComp/MyChat';
import MessageBox from '../Components/messageComponents/MessageBox';
import StartMessage from '../Components/chatComp/StartMessage';
import { setUserSearchBox } from '../redux/slices/conditionSlice';


const Home = () => {
    const selectedChat = useSelector((store) => store?.myChat?.selectedChat);
	const dispatch = useDispatch();
	const isUserSearchBox = useSelector(
		(store) => store?.condition?.isUserSearchBox
	);

    return (
        <div className="flex w-full border-green-50 border rounded-sm shadow-md shadow-black relative">
			<div
				className={`${
					selectedChat && "hidden"
				} sm:block sm:w-[40%] w-full h-[80vh] bg-black/40 border-r border-slate-500 relative`}
			>
				<div className="absolute bottom-3 right-6 cursor-pointer text-white">
					<MdChat
						title="New Chat"
						fontSize={32}
						onClick={() => dispatch(setUserSearchBox())}
					/>
				</div>
				{isUserSearchBox ? <UserSearch /> : <MyChat />}
			</div>
			<div
				className={`${
					!selectedChat && "hidden"
				} sm:block sm:w-[60%] w-full h-[80vh] bg-black/40 relative overflow-hidden`}
			>
				{selectedChat ? (
					<MessageBox chatId={selectedChat?._id} />
				) : (
					<StartMessage />
				)}
			</div>
		</div>
    );
};

export default Home;
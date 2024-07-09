import { createSlice } from "@reduxjs/toolkit";

const conditionSlice = createSlice({
	name: "condition",
	initialState: {
		isLoading: false,
		isChatLoading: false,
		isMessageLoading: false,
		isSendLoading: false,
		isProfileDetail: false,
		isHeaderMenu: false,
		isChatDetailsBox: false,
		isUserSearchBox: false,
		isGroupChatBox: false,
	},
	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		setChatLoading: (state, action) => {
			state.isChatLoading = action.payload;
		},
		setMessageLoading: (state, action) => {
			state.isMessageLoading = action.payload;
		},
		setSendLoading: (state, action) => {
			state.isSendLoading = action.payload;
		},
		setProfileDetail: (state, action) => {
			state.isProfileDetail = !state.isProfileDetail;
		},
		setHeaderMenu: (state, action) => {
			state.isHeaderMenu = action.payload;
			state.isChatDetailsBox = false;
		},
		setChatDetailsBox: (state, action) => {
			state.isHeaderMenu = false;
			state.isChatDetailsBox = action.payload;
		},
		setUserSearchBox: (state, action) => {
			state.isUserSearchBox = !state.isUserSearchBox;
		},
		setGroupChatBox: (state, action) => {
			state.isGroupChatBox = !state.isGroupChatBox;
		},
		updateUserProfileStart: (state) => {
            state.isLoading = true; // Set loading state while updating profile
        },
        updateUserProfileSuccess: (state) => {
            state.isLoading = false; // Clear loading state on successful update
            state.isProfileDetail = false; // Close profile detail view after update
        },
        updateUserProfileFailure: (state) => {
            state.isLoading = false; // Clear loading state on update failure
        },
	},
});
export const {
	setLoading,
	setChatLoading,
	setMessageLoading,
	setSendLoading,
	setProfileDetail,
	setHeaderMenu,
	setChatDetailsBox,
	setUserSearchBox,
	setGroupChatBox,
	updateUserProfileStart,
    updateUserProfileSuccess,
    updateUserProfileFailure,
    
} = conditionSlice.actions;
export default conditionSlice.reducer;
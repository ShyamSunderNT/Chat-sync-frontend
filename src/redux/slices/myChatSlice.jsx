// import { createSlice } from "@reduxjs/toolkit";

// const myChatSlice = createSlice({
// 	name: "myChat",
// 	initialState: {
// 		chat: [],
// 		selectedChat: null,
// 	},
// 	reducers: {
// 		addMyChat: (state, action) => {
// 			state.chat = action.payload;
// 		},
// 		addSelectedChat: (state, action) => {
// 			state.selectedChat = action.payload;
// 		},
// 		updateChatName: (state, action) => {
//             if (state.selectedChat) {
//                 state.selectedChat.chatName = action.payload.newChatName;
//             }
//         },
		
// 	}
// });

// export const { addMyChat, addSelectedChat,updateChatName } = myChatSlice.actions;
// export default myChatSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const myChatSlice = createSlice({
  name: "myChat",
  initialState: {
    chat: [],
    selectedChat: null,
    loading: false,
    error: null,
  },
  reducers: {
    addMyChat: (state, action) => {
      state.chat = action.payload;
    },
    addSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  addMyChat,
  addSelectedChat,
  setLoading,
  setError,
  clearError,
} = myChatSlice.actions;

export default myChatSlice.reducer;
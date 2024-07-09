import GroupLogo from "../assets/group.jpg";

const getChatName = (chat, authUserId) => {
  if (!chat) {
    return "";
  }

  if (chat.isGroupChat) {
    return chat.chatName;
  }

  // Personal chat logic
  if (chat.chatName === "Messenger") {
    if (authUserId === chat.users[0]._id) {
      return `${chat.users[1].firstName} ${chat.users[1].lastName}`;
    } else {
      return `${chat.users[0].firstName} ${chat.users[0].lastName}`;
    }
  } else {
    return chat.chatName;
  }
};

export const getChatImage = (chat, authUserId) => {
  // Determine if it's a private chat or group chat
  if (chat.chatName === "Messenger") {
    // Private chat logic
    const otherUserId =
      authUserId === chat.users[0]._id ? chat.users[1]._id : chat.users[0]._id;
    const otherUserImage =
      authUserId === chat.users[0]._id
        ? chat.users[1].image
        : chat.users[0].image;
    return otherUserImage;
  } else {
    // Group chat logic (using GroupLogo as fallback)
    return GroupLogo;
  }
};
export default getChatName;

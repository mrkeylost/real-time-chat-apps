import { useEffect, useRef } from "react";
import { useChatStore } from "../store/chatStore";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/authStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { formatDateLabel, formatMessageTime } from "../utils/dateFormatter";

const ChatContainer = () => {
  const messageEndRef = useRef(null);

  const { auth } = useAuthStore();
  const {
    messages,
    getMessages,
    isMessageLoad,
    selectedUser,
    subscribeToMessage,
    unsubscribeFromMessage,
  } = useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessage();

    return () => unsubscribeFromMessage();
  }, [
    getMessages,
    selectedUser._id,
    subscribeToMessage,
    unsubscribeFromMessage,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const groupMessagesByDate = (messages) => {
    return messages.reduce((groups, message) => {
      const date = new Date(message.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      if (!groups[date]) groups[date] = [];
      groups[date].push(message);
      return groups;
    }, {});
  };

  if (isMessageLoad)
    return (
      <div className="flex flex-1 flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />;
      </div>
    );

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(groupMessagesByDate(messages)).map(
          ([date, dateMessages]) => (
            <div key={date}>
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-base-300" />
                <span className="text-xs text-zinc-400 bg-base-100 px-3 py-1 rounded-full border border-base-300">
                  {formatDateLabel(date)}
                </span>
                <div className="flex-1 h-px bg-base-300" />
              </div>

              {dateMessages.map((message) => (
                <div
                  key={message._id}
                  className={`chat ${message.senderId === auth._id ? "chat-end" : "chat-start"}`}
                  ref={messageEndRef}
                >
                  <div className="chat-image avatar">
                    <div className="size-10 rounded-full border">
                      <img
                        src={
                          message.senderId === auth._id
                            ? auth.profilePic || "/avatar.png"
                            : selectedUser.profilePic || "/avatar.png"
                        }
                        alt="profile pic"
                      />
                    </div>
                  </div>
                  <div className="chat-header mb-1">
                    <time className="text-xs opacity-50 ml-1">
                      {formatMessageTime(message.createdAt)}
                    </time>
                  </div>
                  <div className="chat-bubble flex flex-col">
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="sm:max-w-[200px] rounded-md mb-2"
                      />
                    )}
                    {message.text && <p>{message.text}</p>}
                  </div>
                </div>
              ))}
            </div>
          ),
        )}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;

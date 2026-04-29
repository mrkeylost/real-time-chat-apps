import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
import Sidebar from "../components/Sidebar";
import { useChatStore } from "../store/chatStore";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen flex overflow-hidden bg-base-200 pt-16">
      <Sidebar />
      {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
    </div>
  );
};
export default HomePage;

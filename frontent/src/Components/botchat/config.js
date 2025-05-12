import { createChatBotMessage } from "react-chatbot-kit";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import Options from "./Options";

const config = {
  botName: "Village24x7",
  initialMessages: [
    createChatBotMessage("Welcome to Village24x7", {
      delay: 500,
    }),
    createChatBotMessage("How can I assist you with organic products today?", {
      delay: 1000,
      widget: "options",
    }),
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#ffffff",
    },
    chatButton: {
      backgroundColor: "#000000",
    },
  },
};

export default config;
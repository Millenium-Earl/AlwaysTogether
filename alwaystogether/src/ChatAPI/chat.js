import PubSub from "pubsub-js";
import { CometChat } from "@cometchat-pro/chat";

import { TEXT_MSG, MEDIA_MSG } from '../Utils/consts';



require("dotenv").config();

const appID = process.env.REACT_APP_ID;
const apiKey = process.env.REACT_APP_API_KEY;
const region = process.env.REACT_APP_REGION;
const cometChatSettings = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();

export const initChat = () => {
  return CometChat.init(appID, cometChatSettings)
    .then(
      () => {
        console.log("Initialization completed successfully");
        //You can now call login function.
      },
      error => {
        console.log("Initialization failed with error:", error);
        //Check the reason for error and take appropriate action.
      }
    );

};



export const sendChatMessage = messagePayload => {
    const receiverID = "supergroup";
  
    if (typeof messagePayload === "object") {
      return sendMediaMessage(receiverID, messagePayload);
    } else {
      return sendTextMessage(receiverID, messagePayload);
    }
  };



  const sendMediaMessage = (receiverID, message) => {
    const messageType = message.type.startsWith('image') ? CometChat.MESSAGE_TYPE.IMAGE : CometChat.MESSAGE_TYPE.FILE;
    const receiverType = CometChat.RECEIVER_TYPE.GROUP;
  
    const mediaMessage = new CometChat.MediaMessage(
      receiverID,
      message,
      messageType,
      receiverType
    );
  
    return CometChat.sendMediaMessage(mediaMessage).then(
      message => {
        // Message sent successfully.
        console.log("Media message sent successfully", message);
        return message
      },
      error => {
        console.log("Media message sending failed with error", error);
        // Handle exception.
      }
    );
  };
  
  const sendTextMessage = (receiverID, message) => {
    const receiverType = CometChat.RECEIVER_TYPE.GROUP;
  
    const textMessage = new CometChat.TextMessage(
      receiverID,
      message,
      receiverType
    );
  
    return CometChat.sendMessage(textMessage).then(
      message => {
        console.log("Message sent successfully:", message);
        return message;
      },
      error => {
        console.log("Message sending failed with error:", error);
      }
    );
  };
import useWebSocket, {ReadyState} from "react-use-websocket";
import {useState} from "react";
import {MessageComponent} from "../messageComponent/MessageComponent";


export const EventChatComponent = ({event, user}) => {

    const { sendJsonMessage } = useWebSocket(user.isAuth ? `ws://127.0.0.1:8000/ws/${event.id}/` : null, {
        queryParams: {
            Authorization: user.isAuth ? `Bearer ${localStorage.getItem("access_token")}` : "",
        },
    });
    const [message, setMessage] = useState("");
    const [messageHistory, setMessageHistory] = useState([]);

    const { readyState } = useWebSocket(user.isAuth ? `ws://127.0.0.1:8000/ws/${event.id}/` : null, {
        queryParams: {
            Authorization: user.isAuth ? `Bearer ${localStorage.getItem("access_token")}` : "",
        },
        onOpen: () => {
            console.log("Connected!");
        },
        onClose: () => {
            console.log("Disconnected!");
        },
        onMessage: (e) => {
            const data = JSON.parse(e.data);
            switch (data.type) {
                case "history_messages":
                    // setWelcomeMessage(data.message);
                    setMessageHistory(data.message.messages);
                    console.log(data.message.messages)
                    break;
                case 'chat_message_echo':
                    console.log(data.message)
                    setMessageHistory((prev) => prev.concat([data.message]));
                    break;
                default:
                    console.error("Unknown message type!");
                    break;
            }
        }
    });

    const connectionStatus = {
        [ReadyState.CONNECTING]: "Connecting",
        [ReadyState.OPEN]: "Open",
        [ReadyState.CLOSING]: "Closing",
        [ReadyState.CLOSED]: "Closed",
        [ReadyState.UNINSTANTIATED]: "Uninstantiated"
    }[readyState];

    const sendForm = () => {
        sendJsonMessage({
            type: "chat_message",
            message,
        });
        setMessage("");
    }

    const changeMessage = (e) => {
        setMessage(e.target.value);
    }

    return (
        <div className={"event-chat-component disabled"}>
            <span className={"elem elem-1"}>Обсуждение<span className={"count"}>&nbsp;&nbsp;0</span></span>
            <div className={"elem elem-2 scroll"}>
                {messageHistory.map((message, key) => (
                    <MessageComponent user={user.user} message={message}/>
                ))}
            </div>
            <div className={"elem elem-3"}>
                <textarea className={"el el-1 scroll"} placeholder={"Введите текст сообщения"} onChange={changeMessage}></textarea>
                <button className={"el btn-second"} onClick={sendForm}>Отправить</button>
            </div>
        </div>
    )
}
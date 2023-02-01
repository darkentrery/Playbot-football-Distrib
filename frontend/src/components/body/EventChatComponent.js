import useWebSocket, {ReadyState} from "react-use-websocket";
import {useEffect, useRef, useState} from "react";
import {MessageComponent} from "../messageComponent/MessageComponent";
import $ from "jquery";


export const EventChatComponent = ({event, user, className=''}) => {
    const chatRef = useRef();
    const [message, setMessage] = useState("");
    const [messageHistory, setMessageHistory] = useState([]);
    const [lastEvent, setLastEvent] = useState(false);
    const [lastR, setLastR] = useState(0);
    const [firstLoad, setFirstLoad] = useState(true);
    const SOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL;

    const { sendJsonMessage } = useWebSocket(user.isAuth ? `${SOCKET_URL}${event.id}/` : null, {
        queryParams: {
            Authorization: user.isAuth ? `Bearer ${localStorage.getItem("access_token")}` : "",
            Refresh: user.isAuth ? `${localStorage.getItem("refresh_token")}` : "",
        },
    });

    const { readyState } = useWebSocket(user.isAuth ? `${SOCKET_URL}${event.id}/` : null, {
        queryParams: {
            Authorization: user.isAuth ? `Bearer ${localStorage.getItem("access_token")}` : "",
            Refresh: user.isAuth ? `${localStorage.getItem("refresh_token")}` : "",
        },
        onOpen: () => {
            console.log("Connected!");
        },
        onClose: () => {
            setMessageHistory([]);
            console.log("Disconnected!");
        },
        onMessage: (e) => {
            const data = JSON.parse(e.data);
            switch (data.type) {
                case "history_messages":
                    if (!messageHistory.length) {
                        setMessageHistory(data.message.messages);
                    }
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

    useEffect(() => {
        if (chatRef.current && chatRef.current.children.length && firstLoad) {
            let children = chatRef.current.children;
            children[children.length - 1].scrollIntoView(false);
            $('.head-component')[0].scrollIntoView();
            setFirstLoad(false);
        }
    }, [messageHistory])

    const connectionStatus = {
        [ReadyState.CONNECTING]: "Connecting",
        [ReadyState.OPEN]: "Open",
        [ReadyState.CLOSING]: "Closing",
        [ReadyState.CLOSED]: "Closed",
        [ReadyState.UNINSTANTIATED]: "Uninstantiated"
    }[readyState];

    const sendForm = () => {
        if (message) {
            let trimMessage = message.trim();
            if (trimMessage) {
                sendJsonMessage({
                    type: "chat_message",
                    message,
                });
                setMessage("");
            }
        }
    }

    const changeMessage = (e) => {
        if (!lastEvent.ctrlKey && lastEvent.keyCode === 13) {
            sendForm();
        } else {
            setMessage(e.target.value);
        }
    }

    const keyMessageDown = (e) => {
        setLastEvent(e);
        if (e.ctrlKey && e.keyCode === 13) {
            setMessage(message.slice(0, e.target.selectionStart) + '\r\n' + message.slice(e.target.selectionStart, message.length));
            setLastR(e.target.selectionStart);
        }
    }

    const keyMessageUp = (e) => {
        if (e.ctrlKey && e.keyCode === 13) {
            e.target.selectionStart = lastR + 1;
            e.target.selectionEnd = lastR + 1;
        }
    }

    return (
        <div className={`event-chat-component ${className}`}>
            <span className={"elem elem-1"}>Чат<span className={"count"}>&nbsp;&nbsp;0</span></span>
            <div className={"elem elem-2 scroll"} ref={chatRef}>
                {messageHistory.map((message, key) => (
                    <MessageComponent
                        user={user.user}
                        previousId={key !== 0 ? messageHistory[key - 1].from_user.id : false}
                        message={message}
                        key={key}
                    />
                ))}
            </div>
            <div className={"elem elem-3"}>
                <textarea className={"el el-1 scroll"} placeholder={"Введите текст сообщения"} value={message}
                          onChange={changeMessage} onKeyDown={keyMessageDown} onKeyUp={keyMessageUp}></textarea>
                <button className={"el btn-second"} onClick={sendForm}>Отправить</button>
            </div>
        </div>
    )
}
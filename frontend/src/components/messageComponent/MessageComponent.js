import {useEffect, useState} from "react";
import UserAvatar from "../UserAvatar/UserAvatar";
import { eventService } from "../../services/EventService";

export const MessageComponent = ({
    className='',
    message,
    user,
    previousId,
    previousMsg,
    event
}) => {
    const [time, setTime] = useState(false);
    let date, newTime, isSameAuthor, isSameTime
    const prevMsgDate = new Date(previousMsg.timestamp).getTime()
    const currentMsgDate = new Date(message.timestamp).getTime()
    if (previousId === message.from_user.id) {
        isSameAuthor = true;

    }

    if (message.content) {
        try {
            message.content = message.content.replace(/^\n+/, '');
            message.content = message.content.replace(/\n+$/, '');
        } catch (e) {
            
        }
    }

    if (currentMsgDate - (5000 * 60) > prevMsgDate) {
        isSameTime = false;
    } else {
        isSameTime = true;
    }

    if (isSameTime && isSameAuthor) {
        const elem = document.getElementById("msg_" + (message.id - 1))
        if (elem) {
            elem.remove()
        }
    }

    if (time) {
        date = time?.split(' ')[0];
        newTime = time?.split(' ')[1];
    }
    useEffect(() => {
        if (message.timestamp) {
            let newTime = new Date(message.timestamp);
            let minutes = newTime.getMinutes() < 10 ? '0' + newTime.getMinutes() : newTime.getMinutes();
            newTime = `${newTime.getHours()}:${minutes}`
            setTime(newTime);
        }
    }, [message])

    const isOrganizer = eventService.isOrganizer(event, message.from_user)
    const currentUserIsOrganizer = eventService.isOrganizer(event, user)
    return (
        <>
            {currentUserIsOrganizer ? 
            <div className={`message-component ${isOrganizer  ? 'right' : ''} ${className}`}>
                <div className={`elem-2 ${isOrganizer ? 'right' : ''}`}>
                    {!isSameAuthor  &&
                        <div className="event-chat__message-user-photo">
                            <UserAvatar className="event-chat__message-user-photo-content"/>
                            <span className={`el-1 black-600-16`}>{message.from_user.username}</span>
                        </div>
                    }
                    <span className={`el-2 black-400-14`}>{message.content.split('\n').map((m, i) => (<span key={i}>{m ? m : <br></br>}</span>))}</span>
                    <span id={"msg_" + message.id} className={`el-3 gray-400-12`}>{date}</span>
                </div>
            </div>
            : 
            <div className={`message-component ${isOrganizer  ? '' : 'right'} ${className}`}>
                <div className={`elem-2 ${isOrganizer ? '' : 'right'}`}>
                    {!isSameAuthor  &&
                        <div className="event-chat__message-user-photo">
                            <UserAvatar className="event-chat__message-user-photo-content"/>
                            <span className={`el-1 black-600-16`}>{message.from_user.username}</span>
                        </div>
                    }
                    <span className={`el-2 black-400-14`}>{message.content.split('\n').map((m, i) => (<span key={i}>{m ? m : <br></br>}</span>))}</span>
                    <span id={"msg_" + message.id} className={`el-3 gray-400-12`}>{date}</span>
                </div>
            </div>
            }
        </>
        
    )
}
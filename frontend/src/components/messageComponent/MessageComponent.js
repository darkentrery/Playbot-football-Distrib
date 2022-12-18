import {useEffect, useRef, useState} from "react";


export const MessageComponent = ({
    className='',
    message,
    user,
}) => {
    const [time, setTime] = useState(false);

    useEffect(() => {
        if (message.timestamp) {
            let newTime = new Date(message.timestamp);
            newTime = `${newTime.getDate()}.${newTime.getUTCMonth() + 1}.${newTime.getFullYear()} в ${newTime.getUTCHours()}:${newTime.getUTCMinutes()}`
            setTime(newTime);
        }
    }, [message])

    return (
        <div className={`message-component ${user.id === message.from_user.id ? 'right' : ''} ${className}`}>
            <div className={`elem-1 player-avatar-icon ${user.id === message.from_user.id ? 'hidden' : ''}`}></div>
            <div className={`elem-2 ${user.id === message.from_user.id ? 'right' : ''}`}>
                <span className={`el-1 black-500-16`}>{message.from_user.username}</span>
                <span className={`el-2 black-500-16`}>{message.content}</span>
                <span className={`el-3 dark-gray-500-16`}>{time}</span>
            </div>
            <div className={`elem-3 player-avatar-icon ${user.id === message.from_user.id ? '' : 'hidden'}`}></div>
        </div>
    )
}
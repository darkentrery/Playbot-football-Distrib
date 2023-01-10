import {useEffect, useState} from "react";


export const MessageComponent = ({
    className='',
    message,
    user,
    previousId,
}) => {
    const [time, setTime] = useState(false);

    useEffect(() => {
        if (message.timestamp) {
            let newTime = new Date(message.timestamp);
            let day = newTime.getDate() < 10 ? '0' + newTime.getDate().toString() : newTime.getDate();
            let month = newTime.getUTCMonth() + 1 < 10 ? '0' + (newTime.getUTCMonth() + 1).toString() : newTime.getUTCMonth() + 1;
            let minutes = newTime.getMinutes() < 10 ? '0' + newTime.getMinutes() : newTime.getMinutes();
            newTime = `${day}.${month}.${newTime.getFullYear()} в ${newTime.getHours()}:${minutes}`
            setTime(newTime);
        }
    }, [message])

    return (
        <div className={`message-component ${user.id === message.from_user.id ? 'right' : ''} ${className}`}>
            <div className={`elem-1 ${message.from_user.id === previousId ? '' : 'player-avatar-icon'} ${user.id === message.from_user.id ? 'hidden' : ''}`}></div>
            <div className={`elem-2 ${user.id === message.from_user.id ? 'right' : ''}`}>
                {message.from_user.id !== previousId && <span className={`el-1 black-500-16`}>{message.from_user.username}</span>}
                <span className={`el-2 black-500-16`}>{message.content.split('\n').map((m, i) => (<span key={i}>{m ? m : <br></br>}</span>))}</span>
                <span className={`el-3 dark-gray-500-16`}>{time}</span>
            </div>
            <div className={`elem-3 ${message.from_user.id === previousId ? '' : 'player-avatar-icon'} ${user.id === message.from_user.id ? '' : 'hidden'}`}></div>
        </div>
    )
}
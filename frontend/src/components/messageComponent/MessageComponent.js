import {useEffect, useState} from "react";


export const MessageComponent = ({
    className='',
    message,
    user,
    previousId,
    previousMsg
}) => {
    const [time, setTime] = useState(false);
    let date, newTime, sameAuthorAndTime
    const prevMsgDate = new Date(previousMsg.timestamp).getTime()
    const currentMsgDate = new Date(message.timestamp).getTime()
    if (currentMsgDate - (1000 * 60) > prevMsgDate && previousId === message.from_user.id) {
        sameAuthorAndTime = true;
    }
    if (time) {
        date = time?.split(' ')[0];
        newTime = time?.split(' ')[1];
    }
    useEffect(() => {
        if (message.timestamp) {
            let newTime = new Date(message.timestamp);
            let day = newTime.getDate() < 10 ? '0' + newTime.getDate().toString() : newTime.getDate();
            let month = newTime.getUTCMonth() + 1 < 10 ? '0' + (newTime.getUTCMonth() + 1).toString() : newTime.getUTCMonth() + 1;
            let minutes = newTime.getMinutes() < 10 ? '0' + newTime.getMinutes() : newTime.getMinutes();
            newTime = `${day}.${month}.${newTime.getFullYear().toString().slice(-2)} ${newTime.getHours()}:${minutes}`
            setTime(newTime);
        }
    }, [message])

    return (
        <div className={`message-component ${user.id === message.from_user.id ? 'right' : ''} ${className}`}>
            <div className={`elem-2 ${user.id === message.from_user.id ? 'right' : ''}`}>
                {message.from_user.id !== previousId && <span className={`el-1 black-500-13`}>{message.from_user.username}</span>}
                <span className={`el-2 black-500-12`}>{message.content.split('\n').map((m, i) => (<span key={i}>{m ? m : <br></br>}</span>))}</span>
                {sameAuthorAndTime ? 
                    <span className={`el-3 gray-400-12`}>{date} &nbsp; {newTime}</span>
                : null
                }
            </div>
        </div>
    )
}
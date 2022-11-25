

export default function EventChatComponent () {
    return (
        <div className={"event-chat-component disabled"}>
            <span className={"elem elem-1"}>Обсуждение<span className={"count"}>&nbsp;&nbsp;0</span></span>
            <div className={"elem elem-2"}>

            </div>
            <div className={"elem elem-3"}>
                <textarea className={"el el-1"} placeholder={"Введите текст сообщения"}></textarea>
                <button className={"el btn-second"}>Отправить</button>
            </div>
        </div>
    )
}
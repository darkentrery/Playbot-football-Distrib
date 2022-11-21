

export default function TitleComponent ({label}) {
    return (
        <div className={"title"}>
            <span className={"t-1"}>{label}</span>
            <div className={"t-2"}>
                <span>Смотреть все</span>
                <div className={"orange-right-arrow-icon"}></div>
            </div>
        </div>
    )
}
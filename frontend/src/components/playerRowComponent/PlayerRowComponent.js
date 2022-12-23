

export const PlayerRowComponent = ({className='', player}) => {

    return (
        <div className={`player-row-component ${className}`}>
            <div className={"el el-1 player-avatar-icon"}>
                <span className={"name"}>{player.username}</span>
                <span className={"role"}>Форвард</span>
            </div>
            <span className={"el el-2"}>88,6</span>
        </div>
    )
}
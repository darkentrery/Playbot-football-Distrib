

export const WarningNoticeComponent = ({content='', critical=false}) => {
    return (
        <div className={`warning-notice-component ${critical ? 'critical' : ''}`}>
            <div className={`icon ${critical ? 'red-warning-icon' : 'yellow-warning-icon'}`}></div>
            <span className={"content black-500-16"}>{content}</span>
        </div>
    )
}
import "./close-button.scss";

export const CloseButtonComponent = ({className='', onClick = () => {}}) => {
    return (
        <div className={`close-button-component ${className}`} onClick={onClick}></div>
    )
}
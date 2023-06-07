import "./back-button.scss";


export const BackButtonComponent = ({className='', onClick = () => {}}) => {
    return (
        <div className={`back-button-component ${className}`} onClick={onClick}></div>
    )
}
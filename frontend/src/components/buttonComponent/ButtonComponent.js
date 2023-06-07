import "./button.scss";


export const ButtonComponent = ({
    className='',
    text='',
    onClick = () => {},
    buttonType='type-1'
}) => {
    return (
        <span
            className={`button-component ${buttonType} ${className}`}
            onClick={onClick}
        >{text}</span>
    )
}
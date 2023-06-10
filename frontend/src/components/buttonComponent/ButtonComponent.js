import "./button.scss";


export const ButtonComponent = ({
    className='',
    text='',
    onClick = () => {},
    buttonType='type-1',
    style={},
}) => {
    return (
        <span
            className={`button-component ${buttonType} ${className}`}
            onClick={onClick} style={style}
        >{text}</span>
    )
}
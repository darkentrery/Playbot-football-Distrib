import "./checkbox.scss";


export const CheckboxComponent = ({
    checked=false,
    setChecked = () => {},
    text='',
    onClick = () => {},
}) => {
    const click = () => {
        onClick();
        setChecked(!checked);
    }
    return (
        <div className={"checkbox-component"} onClick={click}>
            <div className={`cell ${checked ? 'active' : ''}`}></div>
            <span className={"black-400-13"}>{text}</span>
        </div>
    )
}
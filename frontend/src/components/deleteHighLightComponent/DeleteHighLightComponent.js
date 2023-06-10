import {ButtonComponent} from "../buttonComponent/ButtonComponent";


export const DeleteHighLightComponent = ({className='', clickYes = () => {}, clickNo = () => {}}) => {
    return (
        <div className={`delete-high-light-component ${className}`}>
            <span className={"black-600-20 title-elem"}>Уверены, что хотите удалить хайлайт?</span>
            <div className={"buttons-elem"}>
                <ButtonComponent className={"type-red button"} text={"Да, удалить"} onClick={clickYes}/>
                <ButtonComponent className={"type-2 button"} text={"Нет, не удалять"} onClick={clickNo} style={{fontSize: 16}}/>
            </div>
        </div>
    )
}
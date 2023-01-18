import SuccessComponent from "../successComponent/SuccessComponent";


export const SuccessUpdatePasswordComponent = ({isOpen, closeComponent}) => {
    const close = () => {
        closeComponent();
    }

    return(
        <SuccessComponent
            isOpen={isOpen}
            closeSuccess={close}
            title={"Пароль изменен"}
            text={"Запомните свой новый пароль"}
            buttonLabel={"Спасибо"}
        />
    )
}
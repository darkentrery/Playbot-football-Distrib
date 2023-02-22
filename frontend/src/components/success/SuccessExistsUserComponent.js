import SuccessComponent from "../successComponent/SuccessComponent";


export const SuccessExistsUserComponent = ({isOpen, closeComponent}) => {
    return(
        <SuccessComponent
            isOpen={isOpen}
            closeSuccess={closeComponent}
            title={"Неверный username"}
            text={"Пользователь с таким username уже зарегистрирован на сайте!"}
            buttonLabel={"Продолжить"}
            clickSuccess={closeComponent}
        />
    )
}
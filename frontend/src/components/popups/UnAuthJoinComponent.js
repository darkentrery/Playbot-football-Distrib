import SuccessComponent from "../successComponent/SuccessComponent";


export const UnAuthJoinComponent = ({isOpen, closeComponent, showMap, removeMap, openLogin}) => {

    const closeWindow = () => {
        closeComponent();
        showMap();
    }

    const clickSuccess = () => {
        removeMap();
        openLogin();
    }

    return(
        <SuccessComponent
            isOpen={isOpen}
            closeSuccess={closeWindow}
            title={"Присоединиться к игре"}
            text={"Для того чтобы присоединиться \nк игре, нужно зарегистрироваться"}
            buttonLabel={"Регистрация / Вход"}
            clickSuccess={clickSuccess}
        />
    )
}
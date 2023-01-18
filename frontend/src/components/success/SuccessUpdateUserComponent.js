import SuccessComponent from "../successComponent/SuccessComponent";


export const SuccessUpdateUserComponent = ({isOpen, closeComponent}) => {
    const clickSuccess = () => {
        closeComponent();
    }

    return(
        <SuccessComponent
            isOpen={isOpen}
            closeSuccess={clickSuccess}
            title={"Профиль успешно обновлен"}
            text={"Вы можете продолжать работу"}
            buttonLabel={"Вернуться в профиль"}
        />
    )
}
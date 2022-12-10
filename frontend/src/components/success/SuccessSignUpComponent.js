
import SuccessComponent from "./SuccessComponent";


export default function SuccessSignUpComponent ({isOpen, closeComponent, showMap}) {
    const close = () => {
        closeComponent();
        showMap();
    }

    return(
        <SuccessComponent
            isOpen={isOpen}
            closeSuccess={close}
            title={"Подтверди свои данные"}
            text={"Мы отправили инструкции для последущих действий на твою почту"}
            buttonLabel={"Продолжить"}
            clickSuccess={close}
        />
    )
}

import SuccessComponent from "./SuccessComponent";


export default function SuccessSignUpComponent ({isOpen, closeComponent}) {

    return(
        <SuccessComponent
            isOpen={isOpen}
            closeSuccess={closeComponent}
            title={"Подтверди свои данные"}
            text={"Мы отправили инструкции для последущих действий на твою почту"}
            buttonLabel={"Продолжить"}
            // clickSuccess={}
        />
    )
}
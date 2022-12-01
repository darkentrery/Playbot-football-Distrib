import SuccessComponent from "./SuccessComponent";


export default function SuccessRefreshPasswordComponent ({isOpen, closeComponent}) {

    return(
        <SuccessComponent
            isOpen={isOpen}
            closeSuccess={closeComponent}
            title={"Пароль отправлен"}
            text={"Мы отправили новый пароль на твою почту"}
            buttonLabel={"Спасибо"}
            // clickSuccess={}
        />
    )
}
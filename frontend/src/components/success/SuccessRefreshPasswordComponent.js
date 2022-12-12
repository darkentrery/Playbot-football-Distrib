import SuccessComponent from "../successComponent/SuccessComponent";


export default function SuccessRefreshPasswordComponent ({isOpen, closeComponent, showMap}) {
    const close = () => {
        closeComponent();
        showMap();
    }

    return(
        <SuccessComponent
            isOpen={isOpen}
            closeSuccess={close}
            title={"Пароль отправлен"}
            text={"Мы отправили новый пароль на твою почту"}
            buttonLabel={"Спасибо"}
            clickSuccess={close}
        />
    )
}
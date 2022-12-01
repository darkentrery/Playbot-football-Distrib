import SuccessComponent from "./SuccessComponent";


export default function SuccessEditEventComponent ({isOpen, event, closeComponent}) {

    const clickSuccess = () => {
        window.location.href = `${process.env.REACT_APP_MAIN_URL}events/event/${event.id}/`
    }

    return(
        <SuccessComponent
            isOpen={isOpen}
            closeSuccess={closeComponent}
            title={"Событие изменено"}
            text={"Теперь дождитесь, когда соберется необходимое количество игроков и начинайте игру"}
            buttonLabel={"Перейти на страницу события"}
            clickSuccess={clickSuccess}
        />
    )
}
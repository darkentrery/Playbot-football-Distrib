import SuccessComponent from "../successComponent/SuccessComponent";


export default function SuccessSignUp2Component ({isOpen, closeComponent}) {

    const clickSuccess = () => {
        window.location.href = `${process.env.REACT_APP_MAIN_URL}`;
    }

    return(
        <SuccessComponent
            isOpen={isOpen}
            closeSuccess={closeComponent}
            title={"Успешная регистрация"}
            text={"Вы успешно зарегистрировались. Теперь футбол в твоих руках"}
            buttonLabel={"Продолжить"}
            clickSuccess={clickSuccess}
        />
    )
}
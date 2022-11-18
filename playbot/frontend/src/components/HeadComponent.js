

export default function HeadComponent () {


    return(
        <div className={"head"}>
            <div className={"elem elem-1 logo-korobka-icon"}></div>
            <div className={"elem elem-2"}>
                <div className={"menu-point black-point-icon"}>
                    <span>Главная</span>
                </div>
                <div className={"menu-point black-point-icon inactive"}>
                    <span>События</span>
                </div>
                <div className={"menu-point black-point-icon inactive"}>
                    <span>Статистика</span>
                </div>
                <div className={"menu-point black-point-icon inactive"}>
                    <span>FAQ</span>
                </div>
            </div>

            <div className={"elem"}>

            </div>
            <div className={"elem search-black-icon"}></div>
            <div className={"elem elem-5"}>
                <div className={"avatar-black-icon"}></div>
                <span>Регистрация / Вход</span>
            </div>
        </div>
    )
}
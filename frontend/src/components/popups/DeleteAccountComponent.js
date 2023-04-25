import {YesNoComponent} from "../yesNoComponent/YesNoComponent";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import {authService} from "../../services/AuthService";


export const DeleteAccountComponent = ({isOpen, user, closeComponent}) => {
    const clickSuccess = () => {
      closeComponent();
    }
    const clickEndGame = () => {
        authDecoratorWithoutLogin(authService.deleteUser, user).then((response) => {
            console.log(response.data)
            authService.logout();
        })
    }
    
    return (
        <YesNoComponent
            isOpen={isOpen}
            closeSuccess={clickSuccess}
            title={"Удалить аккаунт"}
            text={"Вы уверены, что хотите удалить аккаунта? Весь ваш прогресс будет утерян!"}
            clickSuccess={clickEndGame}
        />
    )
}
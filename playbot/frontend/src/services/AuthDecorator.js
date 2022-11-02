import AuthService from "./AuthService";
import {useEffect} from "react";


export default function CheckToken(func, arg, isLogin, setIsLogin) {
    const authService = new AuthService();
    return useEffect(() => {
        if (isLogin === true) {
            func(setIsLogin()).then((response) => {
                if (response.status == 200) {
                    console.log(response)
                }
            })
        } else if (isLogin === false) {
            authService.refresh(setIsLogin);
            console.log("Fail")
        }
        console.log("!", isLogin)
    }, [isLogin])
}
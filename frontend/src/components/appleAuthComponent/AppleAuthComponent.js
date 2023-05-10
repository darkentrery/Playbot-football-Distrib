import "./apple-auth.scss";
import {authService} from "../../services/AuthService";


const clientId = process.env.REACT_APP_APPLE_CLIENT_AUTH_ID;
console.log(clientId)
const mainUrl = process.env.REACT_APP_MAIN_URL;
// const mainUrl = "https://384f-2001-44c8-460e-a8d3-3dc9-cb03-a9de-4244.ngrok-free.app/";

export const AppleAuthComponent = ({setAuth, closeWindow}) => {
    const login = async (e) => {
        console.log(e)
        try {
            const data = await window.AppleID.auth.signIn();
            console.log(data);
            if (data.hasOwnProperty("user")) {
                authService.appleSignUp({...data.authorization, ...data.user}).then((response) => {
                    console.log(response)
                    setAuth(true, response.data.user);
                    closeWindow();
                })
            } else {
                authService.appleLogin(data.authorization).then((response) => {
                    console.log(response)
                    setAuth(true, response.data.user);
                    closeWindow();
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    const scriptjs = require("scriptjs");
    scriptjs.get('https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js', () => {
      const params = {
        clientId: clientId,
        redirectURI: `${mainUrl}apple-login`,
        scope: 'name email',
        usePopup: true,
      };
      window.AppleID.auth.init(params);
    });

    return (
        <div
            className={"apple-auth-component"}
            id="appleid-signin"
            data-color="black"
            data-border="true"
            data-type="sign in"
            onClick={login}
        ></div>
    )
}
import "./apple-auth.scss";


export const AppleAuthComponent = () => {


    const signIn = async (e) => {
        console.log(e)
        try {
            const data = await window.AppleID.auth.signIn();
            console.log(data);
            // window.location.href = `${process.env.REACT_APP_MAIN_URL}`;
        } catch (error) {
            console.log(error);
        }
    }
    const scriptjs = require("scriptjs");
    scriptjs.get('https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js', () => {
      const params = {
        clientId: 'ru.korobkaplay.test.auth',
        redirectURI: 'https://f87a-2001-44c8-460e-a8d3-2560-896a-5d38-1727.ngrok-free.app/apple-login',
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
            onClick={signIn}
        ></div>
    )
}
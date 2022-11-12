import {TLoginButton, TLoginButtonSize} from "react-telegram-auth";


export default function TelegramLoginComponent () {
    return(
        <TLoginButton
            botName="PlaybotTestBot"
            buttonSize={TLoginButtonSize.Large}
            lang="en"
            usePic={false}
            cornerRadius={20}
            onAuthCallback={(user) => {
              console.log('Hello, user!', user);
            }}
            requestAccess={'write'}
            // redirectUrl={"http://ba62-2a0d-b201-8010-d531-c4fe-c240-f438-dbb0.ngrok.io/auth/complete/telegram"}
            // redirectUrl={"http://localhost:80/auth/complete/telegram"}
            redirectUrl={"https://test.korobkaplay.ru/auth/complete/telegram"}
        />
    )
}


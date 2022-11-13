import {useEffect, useRef} from "react";


export default function TelegramLoginComponent () {
    const ref = useRef();
    function n(e) {
        console.log(e)
    }

    useEffect(() => {
        const script = document.createElement('script');
        const func = document.createElement('script');
        func.innerHTML = n;

        // script.src = "http://27d5-2a0d-b201-8010-7155-acb3-f7-a736-e390.ngrok.io/static/js/telegram.js"
        script.src = "https://test.korobkaplay.ru/static/js/telegram.js"
        script.async = true;
        script.setAttribute('data-telegram-login', 'PlaybotTestBot');
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-request-access', 'write');
        script.setAttribute('data-userpic', 'false');
        script.setAttribute('data-onauth', `${n.name}(e)`);


        ref.current.appendChild(script);
        ref.current.appendChild(func);


        return () => {
            // ref.current.removeChild(script);
            // ref.current.removeChild(func);
        }
      }, []);

    return(
        // <TLoginButton
        //     botName="PlaybotTestBot"
        //     buttonSize={TLoginButtonSize.Large}
        //     lang="ru"
        //     usePic={false}
        //     cornerRadius={20}
        //     onAuthCallback={(user) => {
        //       console.log('Hello, user!', user);
        //     }}
        //     requestAccess={'write'}
        //     // redirectUrl={"http://ba62-2a0d-b201-8010-d531-c4fe-c240-f438-dbb0.ngrok.io/auth/complete/telegram"}
        //     // redirectUrl={"http://127.0.0.1:80/auth/complete/telegram"}
        //     // redirectUrl={"https://test.korobkaplay.ru/auth/complete/telegram"}
        // />
        // <script async src="https://telegram.org/js/telegram-widget.js?21" data-telegram-login="PlaybotTestBot" data-size="large" data-request-access="write" data-userpic="false" data-onauth="onTelegramAuthUser(user)" >
        //     {/*{script.toString()}*/}
        // </script>
        <div ref={ref}></div>

    )
}


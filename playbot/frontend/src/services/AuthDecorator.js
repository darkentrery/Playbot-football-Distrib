import AuthService from "./AuthService";


export async function getData(func, arg, openLogin, setOpenLogin) {
    let accessToken = null;
    let refreshToken = null;
    let dateToken = null;
    const authService = new AuthService();
    console.log(localStorage.access_token)

    if (localStorage.access_token) {
        accessToken = localStorage.access_token;
        refreshToken = localStorage.refresh_token;
        dateToken = localStorage.date_token;
    } else {
        setOpenLogin(!openLogin)
    }

    if (accessToken) {
        if (Date.now() - dateToken > 1.5*60*1000) {
            await authService.refresh();
        }
    }
    // else {
    //     setOpenLogin(!openLogin)
    // }
    if (arg) {
        return await func(arg);
    } else {
        return await func();
    }
}

export async function authDecoratorWithoutLogin(func, arg) {
    let accessToken = null;
    let refreshToken = null;
    let dateToken = null;
    const authService = new AuthService();
    console.log(localStorage.access_token)

    if (localStorage.access_token) {
        accessToken = localStorage.access_token;
        refreshToken = localStorage.refresh_token;
        dateToken = localStorage.date_token;
    }

    if (accessToken) {
        if (Date.now() - dateToken > 1.5*60*1000) {
            await authService.refresh();
        }
    }

    if (arg) {
        return await func(arg);
    } else {
        return await func();
    }
}
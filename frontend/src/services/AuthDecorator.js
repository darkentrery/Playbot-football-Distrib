import AuthService from "./AuthService";


export async function getData(func, arg, openLogin, setOpenLogin) {
    let accessToken = null;
    let refreshToken = null;
    let dateToken = null;
    const authService = new AuthService();

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

const doFunc = (func, arg) => {
    if (arg) {
        return func(arg).then((response) => {return response;});
    } else {
        return func().then((response) => {return response;});
    }
}

export function authDecoratorWithoutLogin(func, arg) {
    let accessToken = null;
    let refreshToken = null;
    let dateToken = null;
    const authService = new AuthService();

    if (localStorage.access_token) {
        accessToken = localStorage.access_token;
        refreshToken = localStorage.refresh_token;
        dateToken = localStorage.date_token;
    }

    if (accessToken) {
        if (Date.now() - dateToken > 4.5*60*1000) {
            return authService.refresh().then((response) => {
                if (response.status === 200) {
                    return doFunc(func, arg).then((response) => {return response;});
                }
            })
        } else {
            return doFunc(func, arg).then((response) => {return response;});
        }
    } else {
        return doFunc(func, arg).then((response) => {return response;});
    }
}
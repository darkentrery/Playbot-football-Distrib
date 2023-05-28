const errorsText = {
    username: {
        "User с таким Имя пользователя уже существует.": "Пользователь с username уже существует!",
    },
    email: {
        "User с таким Email Address уже существует.": "Пользователь с таким email уже существует!",
        "Введите правильный адрес электронной почты.": "Введите правильный адрес электронной почты!",
    },
    phone_number: {
        "User с таким Phone Number уже существует.": "Пользователь с таким номером уже существует!",
    },
}

export const errorsUtil = {
    getError(field, error) {
        return errorsText[field][error];
    },
}
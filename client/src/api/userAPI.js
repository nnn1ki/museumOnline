import {$authHost, $host} from "./axios";
import jwt_decode from "jwt-decode";
import UserStore from "../museum/UserStore";

// POST-запрос на сервер с данными пользователя (электронной почтой, паролем и ролью). После успешной регистрации,
// токен, полученный от сервера, сохраняется в локальном хранилище браузера, и затем расшифровывается с использованием jwt_decode.
export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

// Также отправляется POST-запрос с данными пользователя (электронной почтой и паролем),
// и после успешного входа токен сохраняется в локальном хранилище браузера.
export const login = async (email_user, password_user) => {
    const { data, userInfo } = await $host.post('api/user/login', {email_user, password_user} );

    // const userInfo  = await getUserInfo(email_user);
    //вот тут я хочу получить информацию о пользователе
    // console.log("Вывод информации на фронте --- ", userInfo);

    localStorage.setItem('token', data.token);
    return {token: jwt_decode(data.token), user: userInfo };
}

//функция выполняет GET-запрос на защищенный ресурс, требующий аутентификации (авторизации).
// Если запрос успешен, токен сохраняется в локальном хранилище, и расшифрованные данные токена возвращаются из функции.
// Обратите внимание, что здесь используется $authHost, который предположительно добавляет токен авторизации к запросу.
export const check = async () => {
    const {data} = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    console.log("data ---- ", jwt_decode(data.token));
    return jwt_decode(data.token);
}

export const getUserInfo = async (email_user) => {
    try {
        const { data } = await $authHost.get(`api/user/getInfo/${email_user}`);
        return data.user;
    } catch (error) {
        console.error('Error searching user by email:', error);
        throw error;
    }
}


export const updateUser = async (user) => {
    try {
        const { data } = await $host.put(`api/user/update`, { newUser: user });
        return data;
    }catch (e){
        console.log("Ошибка обновления информации о пользователе", e);
    }
}
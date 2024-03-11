import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {check} from './api/userAPI';
import {Context} from "./index";
import {Spinner} from "react-bootstrap";

const App = observer(() => {
    // Состояние для отображения спиннера при загрузке данных
    const [loading, setLoading] = useState(true);
    // Получение доступа к хранилищу пользователя из контекста
    const {user} = useContext(Context);

    // Загрузка данных пользователя при монтировании компонента
    useEffect(() => {
        check(user)
            .then(data => {
                // Установка данных пользователя в хранилище
                // user.setUser(user);
                user.setUser(data)
                // Установка флага авторизации в true
                user.setIsAuth(true);
            })
            .finally(() => setLoading(false));
    }, [user])

    // Если данные все еще загружаются, отображаем спиннер
    if (loading) {
        return <Spinner animation="grow"/>
    }
    // Иначе отображаем основной контент приложения
    return (

        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
});

export default App;
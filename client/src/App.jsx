import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {check} from './api/userAPI';
import {Context} from "./index";
import {Spinner} from "react-bootstrap";

const App = observer(() => {
    const [loading, setLoading] = useState(true);
    const {user} = useContext(Context);

    useEffect(() => {
        check()
            .then(data => {
                user.setUser(user);
                user.setIsAuth(true);
            })
            .finally(() => setLoading(false));
    }, [])

    if (loading) {
        return <Spinner animation="grow"/>
    }

    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
});

export default App;
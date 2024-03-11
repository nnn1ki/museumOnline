import React, {useContext} from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const history = useHistory();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
    };

    return (
        <Navbar bg="white" variant="white">
            <Container className="px-3">
                <Navbar.Brand href={SHOP_ROUTE}>Онлайн магазин</Navbar.Brand>

                {user.isAuth ?
                    <Nav>
                        <Button
                            variant="outline-dark"
                            onClick={() => history.push(ADMIN_ROUTE)}
                        >
                            Админ панель
                        </Button>
                        <Button
                            className="ml-2"
                            variant="outline-dark"
                            onClick={() => logOut()}
                        >
                            Выйти
                        </Button>
                        <Button
                            variant="outline-dark"
                            onClick={() => history.push(BASKET_ROUTE)}
                        >
                            Корзина
                        </Button>
                    </Nav>
                    :
                    <Nav>
                        <Button variant="outline-dark" onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>

                }
            </Container>
        </Navbar>
    );
})

export default NavBar;
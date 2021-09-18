import React, {useContext} from 'react';
import {Button, Nav, Navbar, Container} from "react-bootstrap";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const history = useHistory();

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href={SHOP_ROUTE}>Онлайн магазин</Navbar.Brand>

                {user.isAuth ?
                    <Nav>
                        <Button
                            variant="outline-light"
                            onClick={() => history.push(ADMIN_ROUTE)}
                        >
                            Админ панель
                        </Button>
                        <Button
                            className="ml-2"
                            variant="outline-light"
                            onClick={() => history.push(LOGIN_ROUTE)}
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav>
                        <Button variant="outline-light" onClick={() => user.setIsAuth(true)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
})

export default NavBar;
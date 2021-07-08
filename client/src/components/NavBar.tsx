import React from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {NavLink} from 'react-router-dom'
import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {SHOP_ROUTE} from "../utils/consts";

const NavBar = () => {
    const {isAuth} = useTypedSelector(state => state.user)

    const auth = () => {

    }

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href={SHOP_ROUTE}>Онлайн магазин</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            {isAuth ?
                <Nav>
                    <Button variant="outline-light">Админ панель</Button>
                    <Button variant="outline-light">Войти</Button>
                </Nav>
                :
                <Nav>
                    <Button variant="outline-light" onClick={auth}>Авторизация</Button>
                </Nav>
            }
        </Navbar>
    );
};

export default NavBar;
import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";

const Auth = () => {
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{minHeight: window.innerHeight - 56}}
        >
            <Card
                style={{width: "100%", maxWidth: 600}}
                className="p-4"
            >
                <h2 className="m-auto">
                    {isLogin ? "Авторизация" : "Регистрация"}
                </h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-2"
                        placeholder="Введите ваш email"
                    />
                    <Form.Control
                        className="mt-2"
                        placeholder="Введите ваш пароль"
                    />
                    <Row className="px-3 mt-3 justify-content-between">
                        {isLogin ?
                            <div>
                                Нет аккаунта? &nbsp;
                                <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? &nbsp;
                                <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                            </div>
                        }
                        <Button variant="outline-success">
                            {isLogin ? "Войти" : "Регистрация"}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;
import React, {useContext, useState} from 'react';
import {NavLink, useHistory, useLocation} from 'react-router-dom';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {getUserInfo, login, registration} from "../api/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {userInfo} from "os";
import {comparer} from "mobx";
import {getOrderByUser} from "../api/orderAPI";

//страница авторизации


const Auth = observer(() => {
    const {user} = useContext(Context);
    const location = useLocation();
    const history = useHistory();
    const isLogin = location.pathname === LOGIN_ROUTE;
    // const isLogin = true;
    const [email_user, setEmail] = useState('');
    const [password_user, setPassword] = useState('');

    const click = async () => {
        try {
            if (isLogin) {
                // Выполняем вход и получаем токен
                const decodedToken = await login(email_user, password_user);

                const userInfo = await getUserInfo(email_user);
                const userOrders = await getOrderByUser(userInfo.id_user);


                // console.log(userInfo);
                // console.log(userOrders);
                console.log("userOrders - ", userOrders);
                user.setUser(userInfo);
                user.setOrders(userOrders);
                user.setIsAuth(true);
            } else {
                await registration(email_user, password_user);
            }

            user.setIsAuth(true);
            history.push(SHOP_ROUTE);
            // history.push(ADMIN_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }
    };


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
                        value={email_user}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-2"
                        placeholder="Введите ваш пароль"
                        value={password_user}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
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
                        <Button
                            variant="outline-success"
                            onClick={click}
                        >
                            {isLogin ? "Войти" : "Регистрация"}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
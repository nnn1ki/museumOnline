import React, { useContext, useEffect, useState } from 'react';
import {Button, Container, Form, Row, Table} from 'react-bootstrap';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import {createOrder, deleteOrder, getOrderById, getOrderByUser} from "../api/orderAPI";
import { toJS } from 'mobx';
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {updateUser} from "../api/userAPI";

const Basket = observer(() => {
    const { user } = useContext(Context);
    const [newEmail, setNewEmail] = useState('');
    const [newName, setNewName] = useState('');



    // Удаление товара из корзины
    const removeFromCart = (index) => {
        const updatedBasket = [...basketProducts];
        updatedBasket.splice(index, 1);
        user.setBasket(updatedBasket);
    };


    const createOrderHandler =  () => {
        try {
            console.log("toJS(user.basket)", toJS(user.basket));
            createOrder({ basket: toJS(user.basket), id_user: user.user.id_user } );
            user.setBasket([]); //стираем все значения

        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    //изменение информации о пользователе
    const updateUserInfo = async () => {
        try {
            user.user.username = newName;
            user.user.email_user = newEmail;
            console.log(toJS(user.user));
            await updateUser({ newUser: toJS(user)});
        } catch (error){
            console.log("Ошибка обновления информации пользователя ", error);
        }
    }


    const deleteOrderById = async  (id_order) => {
        try {
            console.log("id_order - ", id_order)
            await deleteOrder({orderId: id_order});
        }catch (error){
            console.log("Не удалось удалить товар - ", error);
        }
    }

    // console.log("вызов заказов из контекста - ", user.user.orders);
    // console.log("user.orders - ", toJS(user.orders));
    // console.log("user.user.basket", toJS(user.basket));

    const orders = toJS(user.orders);
    const basketProducts = toJS(user.basket);


    return (
        <Container className="mt-3">
            <h2>Корзина пользователя</h2>

            <h3>Информация о пользователе</h3>
            <p>Имя : {user.user.username}</p>
            <p>Эл.Адрес: {user.user.email_user}</p>
            <p>Адрес: {user.user.address_user}</p>

            <h3>Изменить информацию о пользователе</h3>
            <Form className="d-flex flex-column">
                <Form.Control
                    className="mt-2"
                    placeholder="Введите новое имя"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                />
                <Form.Control
                    className="mt-2"
                    placeholder="Введите новый адрес"
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
                />
                <Row className="px-3 mt-3 justify-content-between">
                    <Button
                        variant="outline-success"
                        onClick={updateUserInfo}
                    >
                        Обновить
                    </Button>
                </Row>
            </Form>


            <h3>Товары в корзине</h3>
            {basketProducts && basketProducts.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Наименование товара</th>
                        <th>Описание</th>
                        <th>Цена</th>
                        <th>Наличие</th>
                    </tr>
                    </thead>
                    <tbody>
                    {basketProducts.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{item.cost_product}</td>
                            <td>{item.quantity_in_stock}</td>
                            <td>
                                <Button variant="danger" onClick={() => removeFromCart(index)}>
                                    Удалить
                                </Button>
                            </td>
                            {/* Добавьте другие поля, которые вам нужны для отображения товаров в корзине */}
                        </tr>
                    ))}
                    </tbody>
                </Table>
            ) : (
                <p>Ваша корзина пуста.</p>
            )}

            <Button variant="success" onClick={createOrderHandler}>
                Оформить заказ
            </Button>

            <h3>Заказы пользователя</h3>
            {orders && orders.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Дата</th>
                        <th>Статус</th>
                        <th>Название товара</th>
                        <th>Стоимость товара</th>
                        <th>Количество</th>
                        <th>Название магазина</th>
                        <th>Доставка магазина</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{order.date_and_time}</td>
                            <td>{order.status}</td>
                            <td>{order.Order_Products.map((op) => op.Product.title).join(', ')}</td>
                            <td>{order.Order_Products.map((op) => op.Product.cost_product).join(', ')}</td>
                            <td>{order.Order_Products.map((op) => op.quantity_product).join(', ')}</td>
                            <td>{order.Shop.title_shop}</td>
                            <td>{order.Shop.cost_delivery}</td>

                            <td>
                                <Button variant="danger" onClick={() => deleteOrderById(order.id_order)}>
                                    Удалить
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            ) : (
                <p>У вас пока нет заказов.</p>
            )}
        </Container>
    );

});

export default Basket;

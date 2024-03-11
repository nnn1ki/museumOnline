import {makeAutoObservable} from "mobx";

// Этот класс используется для управления состоянием авторизации и информацией о пользователе в вашем приложении.
// Когда состояние меняется, MobX автоматически обновляет все компоненты, которые зависят от этих данных.

export default class UserStore {
    constructor() {
        this._isAuth = true;
        this._user = {};
        this._basket = []; // корзина покупателя
        this._orders = {} //заказы пользователя
        makeAutoObservable(this);
    }

    setBasket(product) {
        this._basket = product;
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        console.log("USER --- ", user);
        this._user = user;
    }

    setOrders(orders) {
        console.log("USER_orders --- ", orders);
        this._orders = orders;
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }

    get basket(){
        return this._basket;
    }

    get orders() {
        return this._orders;
    }
}
import { $authHost, $host } from "./axios";

// Создание нового заказа
export const createOrder = async (orderData) => {
    const { data } = await $authHost.post('api/order', orderData);
    return data;
}

// Получение всех заказов
export const getAllOrders = async () => {
    const { data } = await $host.get('api/order');
    return data;
}

// Получение информации о конкретном заказе по его ID
export const getOrderById = async (orderId) => {
    const { data } = await $host.get(`api/order/${orderId}`);
    return data;
}

//получение заказов по пользователю
export const getOrderByUser = async (id_user) => {
    const { data } = await $host.get(`api/order/getOrderByUser/${id_user}`);
    console.log("data Order - ", data);
    return data;
}

// Обновление информации о заказе по его ID
export const updateOrder = async (orderId, updatedOrderData) => {
    const { data } = await $authHost.put(`api/order/${orderId}`, updatedOrderData);
    return data;
}

// Удаление заказа по его ID
export const deleteOrder = async (orderId) => {
    console.log("orderID - ", orderId.orderId);
    const { data } = await $host.delete(`api/order/deleteOrder/${orderId.orderId}`);
    return data;
}



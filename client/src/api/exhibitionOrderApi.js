import { $authHost, $host } from "./axios";

// Создание нового заказа
export const createExhibitionOrder = async (exhibitionOrderData) => {
    const { data } = await $authHost.post('api/exhibitionOrder', exhibitionOrderData);
    return data;
}

// Получение всех заказов
export const getAllExhibitionOrder = async () => {
    const { data } = await $host.get('api/exhibitionOrder');
    return data;
}

// Получение информации о конкретном заказе по его ID
export const getExhibitionOrderById = async (orderId) => {
    const { data } = await $host.get(`api/order/${orderId}`);
    return data;
}

// Удаление заказа по его ID
export const deleteExhibitionOrder = async (exhibitionOrderId) => {
    console.log("exhibitionOrderId - ", exhibitionOrderId.exhibitionOrderId);
    const { data } = await $host.delete(`api/exhibitionOrder/${exhibitionOrderId.exhibitionOrderId}`);
    return data;
}



import { $authHost, $host } from "./axios";

// Создание нового заказа
export const createExcursion = async (excursionData) => {
    const { data } = await $authHost.post('api/excursion', excursionData);
    return data;
}

// Получение всех заказов
export const getAllExcursion = async () => {
    const { data } = await $host.get('api/excursion');
    return data;
}

// Получение информации о конкретном заказе по его ID
export const getOrderById = async (excursionId) => {
    const { data } = await $host.get(`api/excursion/${excursionId}`);
    return data;
}


// Обновление информации о заказе по его ID
export const updateExcursion = async (excursionId, updatedExcursionData) => {
    const { data } = await $authHost.put(`api/excursion/${excursionId}`, updatedExcursionData);
    return data;
}

// Удаление заказа по его ID
export const deleteExcursion = async (excursionId) => {
    console.log("excursionID - ", excursionId.excursionId);
    const { data } = await $host.delete(`api/excursion/${excursionId.excursionId}`);
    return data;
}



import { $authHost, $host } from "./axios";

// Создание нового заказа
export const createExhibits = async (exhibitsData) => {
    const { data } = await $authHost.post('api/exhibits', exhibitsData);
    return data;
}

// Получение всех заказов
export const getAllExhibits = async () => {
    const { data } = await $host.get('api/exhibits');
    return data;
}

// Получение информации о конкретном заказе по его ID
export const getExhibitsById = async (exhibitsId) => {
    const { data } = await $host.get(`api/exhibits/${exhibitsId}`);
    return data;
}

// Обновление информации о заказе по его ID
export const updateExhibits = async (exhibitsId, updatedExhibitsData) => {
    const { data } = await $authHost.put(`api/exhibits/${exhibitsId}`, updatedExhibitsData);
    return data;
}

// Удаление заказа по его ID
export const deleteExhibits = async (exhibitsId) => {
    console.log("exhibitsId - ", exhibitsId.exhibitsId);
    const { data } = await $host.delete(`api/exhibits/${exhibitsId.exhibitsId}`);
    return data;
}



import { $authHost, $host } from "./axios";

// Создание новой скидки
export const createDiscount = async (discountData) => {
    const { data } = await $authHost.post('api/discount', discountData);
    return data;
}

// Получение всех скидок
export const getAllDiscounts = async () => {
    const { data } = await $host.get('api/discount');
    return data;
}

// Получение информации о конкретной скидке по ее ID
export const getDiscountById = async (discountId) => {
    const { data } = await $host.get(`api/discount/${discountId}`);
    return data;
}

// Обновление информации о скидке по ее ID
export const updateDiscount = async (discountId, updatedDiscountData) => {
    const { data } = await $authHost.put(`api/discount/${discountId}`, updatedDiscountData);
    return data;
}

// Удаление скидки по ее ID
export const deleteDiscount = async (discountId) => {
    const { data } = await $authHost.delete(`api/discount/${discountId}`);
    return data;
}

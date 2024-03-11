import { $authHost, $host } from "./axios";

// Создание нового магазина
export const createShop = async (shopData) => {
    const { data } = await $authHost.post('api/shop', shopData);
    return data;
}

// Получение всех магазинов
export const getAllShops = async () => {
    const { data } = await $host.get('api/shop');
    return data;
}

// Получение информации о конкретном магазине по его ID
export const getShopById = async (shopId) => {
    const { data } = await $host.get(`api/shop/${shopId}`);
    return data;
}

// Обновление информации о магазине по его ID
export const updateShop = async (shopId, updatedShopData) => {
    const { data } = await $authHost.put(`api/shop/${shopId}`, updatedShopData);
    return data;
}

// Удаление магазина по его ID
export const deleteShop = async (shopId) => {
    const { data } = await $authHost.delete(`api/shop/${shopId}`);
    return data;
}

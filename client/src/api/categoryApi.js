import { $authHost, $host } from "./axios";import { $authHost, $host } from "./axios";

// Создание нового заказа
export const createCategory = async (categoryData) => {
    const { data } = await $authHost.post('api/order', categoryData);
    return data;
}

// Обновление информации о типе
export const updateCategory = async (categoryId, updatedCategoryData) => {
    const { data } = await $authHost.put(`api/order/${categoryId}`, updatedCategoryData);
    return data;
}

// Удаление типа
export const deleteCategory = async (categoryId) => {
    console.log("orderID - ", categoryId);
    const { data } = await $host.delete(`api/category/${categoryId.categoryId}`);
    return data;
}



import { $authHost, $host } from "./axios";

// Создание нового продукта
export const createProduct = async (productData) => {
    const { data } = await $authHost.post('api/product', productData);
    return data;
}

// Получение всех продуктов
export const getAllProducts = async () => {
    const { data } = await $host.get('api/product');
    return data;
}

// Получение информации о конкретном продукте по его ID
export const getProductById = async (productId) => {
    const { data } = await $host.get(`api/product/${productId}`);
    return data;
}

// Обновление информации о продукте по его ID
export const updateProduct = async (productId, updatedProductData) => {
    const { data } = await $authHost.put(`api/product/${productId}`, updatedProductData);
    return data;
}

// Удаление продукта по его ID
export const deleteProduct = async (productId) => {
    const { data } = await $authHost.delete(`api/product/${productId}`);
    return data;
}

export const searchProduct = async (productTitle) => {
    try {
        const response = await $authHost.get(`api/product/search/${productTitle}`);

        return response.data;
    } catch (error) {
        console.error('Error searching products:', error);
        throw error;
    }
}

export const setProduct = async (product, productId) => {

}

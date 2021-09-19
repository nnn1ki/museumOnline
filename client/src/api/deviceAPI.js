import {$authHost, $host} from "./axios";

export const createType = async (type) => {
    return await $authHost.post('api/type', type)
        .then(res => res.data);
}

export const fetchTypes = async () => {
    return await $host.get('api/type')
        .then(res => res.data);
}

export const createBrand = async (brand) => {
    return await $authHost.post('api/brand', brand)
        .then(res => res.data);
}

export const fetchBrands = async () => {
    return await $host.get('api/brand')
        .then(res => res.data);
}

export const createDevice = async (device) => {
    return await $authHost.post('api/device', device)
        .then(res => res.data);
}

export const fetchDevices = async () => {
    return await $host.get('api/device')
        .then(res => res.data);
}

export const fetchOneDevices = async (id) => {
    return await $host.get('api/device/' + id)
        .then(res => res.data);
}
import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = [
            {id: 1, name: "Смартфоны"},
            {id: 2, name: "Холодильники"},
            {id: 3, name: "Ноутбуки"},
            {id: 4, name: "Телевизоры"},
        ];
        this._brands = [
            {id: 1, name: "Apple"},
            {id: 2, name: "Samsung"},
        ];
        this._devices = [
            {id: 1, name: "Iphone 13", price: 80000, rating: 9, img: "https://www.apple.com/newsroom/images/product/iphone/geo/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_GEO_09142021_inline.jpg.medium.jpg"},
            {id: 2, name: "Iphone 12", price: 65000, rating: 8, img: "https://cdn.svyaznoy.ru/upload/iblock/958/ruru_iphone12_q121_blue_pdp-image-1b.jpg/resize/483x483/hq/"},
        ];
        this._selectedType = {id: 1, name: "Смартфоны"};
        this._selectedBrand = {id: 1, name: "Apple"};
        makeAutoObservable(this);
    }

    setTypes(types) {
        this._types = types;
    }

    setBrands(brands) {
        this._brands = brands;
    }

    setDevice(devices) {
        this._devices = devices;
    }

    setSelectedType(type) {
        this._selectedType = type;
    }

    setSelectedBrand(brand) {
        this._selectedBrand = brand;
    }

    get types() {
        return this._types;
    }

    get brands() {
        return this._brands;
    }

    get devices() {
        return this._devices;
    }

    get selectedType() {
        return this._selectedType;
    }

    get selectedBrand() {
        return this._selectedBrand;
    }
}
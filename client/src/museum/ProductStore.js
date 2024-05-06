import {makeAutoObservable} from "mobx";

export default class ProductStore {

    constructor() {
        this._products = [];
        this._searchProduct = [];
        this._productsPerPage = 20;
        this._curentPage = 1;
        this._totalPage = 10;
        this._goToPage = this._curentPage + 1;
        makeAutoObservable(this);
    }


    get productsPerPage() {
        return this._productsPerPage;
    }

    get curentPage() {
        return this._curentPage;
    }

    get totalPage() {
        return this._totalPage;
    }

    get goToPage() {
        return this._goToPage;
    }

    setProducts(product) {
        this._products = product;
    }

    get product() {
        return this._products;
    }

    setSearchProduct(product) {
        this._products = product;
    }

    get searchProduct() {
        return this._searchProduct;
    }
}

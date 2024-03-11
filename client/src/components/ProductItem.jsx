import React, { useContext } from 'react';
import {Button, Card, Col} from 'react-bootstrap';
// import { useHistory } from 'react-router-dom';
import { Context } from '../index';
// import { ADD_TO_CART } from '../utils/constants';

const ProductItem = ({ product }) => {
    const { product: productStore } = useContext(Context);
    const { user } = useContext(Context);

    const addToCart = () => {
        // Добавление товара в корзину пользователя
        user.setBasket([...user.basket, { ...product, quantity: 1 }]);


        //тут мы получаем всю информацию о товаре как она написана в бд
        console.log(user.basket);
    };

    return (
        <div className="card m-2" style={{ width: '18rem' }} key={product.id}>
            <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">{product.quantity_in_stock}</p>
                <p className="card-text">{`Price: $${product.cost_product}`}</p>

                <Button variant="primary" onClick={addToCart}>
                    Добавить в корзину
                </Button>
            </div>
        </div>
    );
};

export default ProductItem;

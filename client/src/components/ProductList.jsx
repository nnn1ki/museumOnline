import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import ProductItem from './ProductItem';
import { getAllProducts } from '../api/productAPI';

const ProductList = observer(({ product }) => {

    return (
        <div>
            <div className="container mt-3">
                <div className="row">
                    {product.product.map((p) => (
                        <div key={p.id} className="col-md-4">
                            <ProductItem  product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default ProductList;

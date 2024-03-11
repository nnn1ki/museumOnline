import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";

import MySlider from "../components/MySlider";
import ProductList from "../components/ProductList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import {getAllProducts, setProduct} from "../api/productAPI";
import { searchProduct } from "../api/productAPI";
import { ProductStore } from "../store/ProductStore";

const Shop = observer(() => {
    const { product } = useContext(Context);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getAllProducts().then((data) => {
            if (data) {
                product.setProducts(data);
            }
        });
    }, [product]);




    // для поиска
    const handleSearch = async () => {
        try {
            const result = await searchProduct(searchTerm);
            product.setSearchProduct(result);
            console.log(result);
        } catch (error) {
            console.error('Error searching products:', error);
            // product.setSearchProduct([]); // Если произошла ошибка, устанавливаем пустой массив
            getAllProducts().then((data) => {
                if (data) {
                    product.setProducts(data);
                }
            });

        }
    };


    return (

        <Container fluid>
            <Row className="mt-3">
                <Col md={{ span: 4, offset: 4 }}>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Поиск товаров..."
                            aria-label="Search products"
                            aria-describedby="basic-addon2"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="outline-secondary" id="button-addon2" onClick={handleSearch}>
                            Поиск
                        </Button>
                    </InputGroup>
                </Col>
            </Row>

            {/* Главная область с отступами */}
            <Row className="mt-3">
                <Col md={{ span: 8, offset: 2 }}>
                    {/* Здесь логика отображения товаров */}
                    <ProductList product={product}/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
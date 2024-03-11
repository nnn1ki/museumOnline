import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductItem from "./ProductItem";
// import {useContext, useEffect} from "@types/react";
// import {Context} from "../index";
// import {getAllProducts} from "../api/productAPI";


const MySlider = ({product}) => {
    // const { product: productStore } = useContext(Context);
    //
    // useEffect(() => {
    //     getAllProducts().then((data) => {
    //         if (data) {
    //             product.setProducts(data);
    //         }
    //     });
    // }, [product]);


    const settings = {
        slidesToShow: 5, // Используем количество товаров на странице
        slidesToScroll: 1,
        prevArrow: <button className="prev">Previous</button>,
        nextArrow: <button className="next">Next</button>,
    };

    const productsPerPage = 5;
    const currentPage = 1;
    const totalPages = Math.ceil(product.length / productsPerPage);
    const goToPage = () => {};

    console.log(product.product);
    return (
        <div className="container mt-3">
            <p>тут должен быть слайдер</p>
            <Slider {...settings}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <div key={index} onClick={() => goToPage(index + 1)} className={index + 1 === currentPage ? 'active' : ''}>

                        {product.product.slice(index * productsPerPage, (index + 1) * productsPerPage).map(product => (
                            <ProductItem product={product} />

                        ))}
                    </div>
                ))}
            </Slider>
        </div>
    );

};

export default MySlider;

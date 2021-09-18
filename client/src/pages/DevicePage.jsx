import React from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";

const DevicePage = () => {
    const device = {
        id: 1,
        name: "Iphone 13",
        price: 80000,
        rating: 9,
        img: "https://www.apple.com/newsroom/images/product/iphone/geo/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_GEO_09142021_inline.jpg.medium.jpg"
    };

    const description = [
        {id: 1, title: "title", description: "description"},
        {id: 2, title: "title2", description: "description2"},
        {id: 3, title: "title3", description: "description3"},
        {id: 4, title: "title4", description: "description4"},
        {id: 5, title: "title5", description: "description5"},
    ];

    return (
        <Container>
            <Row className="mt-3">
                <Col md={4}>
                    <Image height={300} src={device.img}/>
                </Col>
                <Col md={4}>
                    <div style={{fontSize: 24, fontWeight: "bold"}}>{device.name}</div>
                    <div>Рейтинг: {device.rating}</div>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around p-3"
                        style={{height: 300, fontSize: 32, border: '2px solid lightgray'}}
                    >
                        <div style={{width: "100%"}}>
                            <h3>Цена:</h3>
                            <h3>{device.price} руб.</h3>
                        </div>
                        <Button variant="outline-dark">Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column my-3">
                <h3>Характеристики:</h3>
                {description.map((info, index) =>
                    <Col
                        key={info.id}
                        style={{background: index % 2 === 0 ? 'lightgray' : 'transparent'}}
                        className="p-2"
                    >
                        {info.title}: {info.description}
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;
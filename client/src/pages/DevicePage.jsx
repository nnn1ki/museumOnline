import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {fetchOneDevices} from "../api/deviceAPI";

const DevicePage = () => {
    const [device, setDevice] = useState({info: []});
    const {id} = useParams();

    useEffect(() => {
        fetchOneDevices(id).then(data => setDevice(data));
    }, [])

    return (
        <Container>
            <Row className="mt-3">
                <Col md={4}>
                    <Image height={300} src={process.env.REACT_APP_API_URL + device.img}/>
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
                {device.info.map((info, index) =>
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
import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, fetchBrands, fetchTypes} from "../../api/deviceAPI";
import {observer} from "mobx-react-lite";

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context);
    const [info, setInfo] = useState([]);
    const [data, setData] = useState({
        name: '',
        price: 0,
        file: null,
    });

    useEffect(() => {
        fetchTypes().then(res => device.setTypes(res));
        fetchBrands().then(res => device.setBrands(res));
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    };

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    };

    const selectFile = e => {
        setData({...data, file: e.target.files[0]});
    };

    const changeHandler = e => {
        setData({...data, [e.target.name]: e.target.value});
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i));
    };

    const addDevice = () => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('img', data.file);
        formData.append('typeId', device.selectedType.id);
        formData.append('brandId', device.selectedBrand.id);
        formData.append('info', JSON.stringify(info));
        createDevice(formData).then(data => onHide());
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Создать устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mb-3">
                        <Dropdown.Toggle>{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item
                                    key={type.id}
                                    onClick={() => device.setSelectedType(type)}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown>
                        <Dropdown.Toggle>{device.selectedBrand.name || "Выберите бренд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item
                                    key={brand.id}
                                    onClick={() => device.setSelectedBrand(brand)}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control
                        className="mt-3"
                        placeholder="Введите название устройства"
                        name="name"
                        value={data.name}
                        onChange={changeHandler}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите стоимость устройства"
                        type="number"
                        name="price"
                        value={data.price}
                        onChange={changeHandler}
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>

                    <Button
                        variant="outline-dark"
                        onClick={addInfo}
                    >
                        Добавить новое свойство
                    </Button>
                    {info.map(i =>
                        <Row key={i.number} className="mt-3">
                            <Col md={6} lg={5}>
                                <Form.Control
                                    size="sm"
                                    placeholder="Введите название свойства"
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                />
                            </Col>
                            <Col className="mt-2 mt-md-0" md={6} lg={5}>
                                <Form.Control
                                    size="sm"
                                    placeholder="Введите описание свойства"
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                />
                            </Col>
                            <Col
                                md={{span: 3, offset: 9}}
                                lg={{span: 2, offset: 0}}
                                className="mt-2 mt-lg-0 text-right"
                            >
                                <Button
                                    className="align-items-center"
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => removeInfo(i.number)}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;
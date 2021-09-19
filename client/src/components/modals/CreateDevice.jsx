import React, {useContext, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";

const CreateDevice = ({show, onHide}) => {
    const {device} = useContext(Context);
    const [info, setInfo] = useState([]);

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    };

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
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
                    <Dropdown>
                        <Dropdown.Toggle>Выберите устройство</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.devices.map(device =>
                                <Dropdown.Item key={device.id}>{device.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control
                        className="mt-3"
                        placeholder="Введите название устройства"
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите стоимость устройства"
                        type="number"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
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
                                />
                            </Col>
                            <Col className="mt-2 mt-md-0" md={6} lg={5}>
                                <Form.Control
                                    size="sm"
                                    placeholder="Введите описание свойства"
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
                <Button variant="outline-success" onClick={onHide}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateDevice;
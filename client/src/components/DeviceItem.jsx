import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import rating from "../assets/images/rating.png";
import {useHistory} from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/consts";

const DeviceItem = ({device}) => {
    const history = useHistory();

    return (
        <Col md={4} lg={3}>
            <Card
                style={{cursor: "pointer"}}
                border="light"
                className="p-2"
                onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}
            >
                <Image style={{margin: "auto"}} height={100} src={device.img}/>

                <div className="d-flex justify-content-between mt-2">
                    <div>Apple</div>
                    <div className="d-flex align-items-center align-self-start">
                        <div className="mr-1">{device.rating}</div>
                        <Image src={rating} width={14} height={14}/>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;
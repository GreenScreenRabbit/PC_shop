import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import "./basket.css";
import PopUpFit from "./popUpFit/popUpFit";

const Basket = () => {
    const [isPopUpFitOpen, setIsPopUpFitOpen] = useState<boolean>(false);

    return (
        <>
            <div className="basket-body" style={{ zIndex: 1 }}>
                <Row>
                    <Col md={{ span: 10, offset: 1 }}>
                        <Row>
                            <Col md={8}>
                                <div
                                    onClick={() => {
                                        setIsPopUpFitOpen(true);
                                    }}
                                    style={{
                                        height: "100px",
                                        width: "100px",
                                        position: "relative",
                                        backgroundColor: "green",
                                    }}
                                >
                                    vvvv
                                </div>
                                8
                            </Col>
                            <Col md={4}>
                                <div className="basket-itemsCpntainer">
                                    <div className="basket-item"></div>
                                </div>
                                4
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <PopUpFit isPopUpFitOpen={isPopUpFitOpen} />
        </>
    );
};

export default connect(null, null)(Basket);

import { Button, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import CompereWithPage from "./compereWithPage/compereWithPage";
import "./productPage.css";

const ProductPage = () => {
    return (
        <>
            <Row>
                <Col md={{ offset: 1 }}>
                    <div className="productPage-imgContainer">
                        <img src="#" className="productPage-img" />
                    </div>
                </Col>
                <Col md={{ span: 5 }}>
                    <div className="mainInformation">
                        <Row className="price-container">
                            <Col md={{ span: 3 }} className="price-itemsContainer">
                                <div className="price-item">PRICE</div>
                            </Col>
                            <Col md={{ span: 4 }}>
                                <Button variant="success" className="price-buyButton">
                                    BUY
                                </Button>
                            </Col>
                        </Row>

                        <Row className="compareWith">
                            <Col md={{ offset: 1, span: 4 }}>
                                <Button className="compareWith-button">Compare With</Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <CompereWithPage />
        </>
    );
};

export default connect(null, null)(ProductPage);

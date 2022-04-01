import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import "./mainSlider.css";

const MainSlider = () => {
    return (
        <>
            <Row style={{ backgroundColor: "red", height: "450px" }}>
                <Col md={{ span: 8, offset: 2 }} style={{ backgroundColor: "blue" }}></Col>
            </Row>
        </>
    );
};

export default connect(null, null)(MainSlider);

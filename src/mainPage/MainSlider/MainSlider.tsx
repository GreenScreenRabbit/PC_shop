import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import "./mainSlider.css";

import slider1 from '../../sliders/slider1.jpg'
import slider2 from '../../sliders/slider2.jpg'
import slider3 from '../../sliders/slider3.jpg'
import slider4 from '../../sliders/slider4.jpg'


const MainSlider = () => {

    const slidersImg: string[] = []

    slidersImg.push(slider1, slider2, slider3, slider4)


    return (
        <>
            <Row style={{ backgroundColor: "red", height: "450px" }}>
                <Col md={{ span: 8, offset: 2 }} style={{ backgroundColor: "blue" }}></Col>
            </Row>
        </>
    );
};

export default connect(null, null)(MainSlider);

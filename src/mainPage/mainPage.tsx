import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Calatol from "../catalog/calatol";
import Footer from "../footer/footer";
import ProductPage from "../productPage/ProductPage";
import LineItems from "./LiteItems/lineItems";
import "./mainPage.css";
import MainSection from "./mainSection/mainSection";
import MainSlider from "./MainSlider/MainSlider";

const MainPage = () => {
    return (
        <>
            <MainSlider />
            <LineItems />
            <Calatol />
            <Row className="RowMainSection">
                <Col sm={12} md={6}>
                    <a href="gj">
                        <MainSection />
                    </a>
                </Col>
                <Col sm={12} md={6}>
                    <MainSection />
                </Col>
            </Row>

            <Footer />

        </>
    );
};

export default connect(null, null)(MainPage);

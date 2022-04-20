import { Col, Row } from "react-bootstrap";
import { connect, ConnectedProps, RootStateOrAny } from "react-redux";
import Calatol from "../catalog/catalog";
import { EquipmentsType } from "../equipmentType/equipmentType";
import Footer from "../footer/footer";
import ProductPage from "../productPage/ProductPage";
import LineItems from "./LiteItems/lineItems";
import "./mainPage.css";
import MainSection from "./mainSection/mainSection";
import MainSlider from "./MainSlider/MainSlider";

type PropsType = {
    equipments: EquipmentsType | undefined;
};

const MainPage = (props: PropsType) => {

    return (
        <>
            <MainSlider />
            <LineItems />
            <Calatol />
            <Row className="RowMainSection">
                <Col sm={12} md={6}>
                        <MainSection items={props.equipments?.videoCards} />
                    
                </Col>
                <Col sm={12} md={6}>
                    <MainSection items={props.equipments?.processors} />
                </Col>
            </Row>

        </>
    );
};

const mapStateToProps = (state: RootStateOrAny) => ({
    equipments: state.mainPageState.equipments,
});






export default connect(mapStateToProps, {})(MainPage);
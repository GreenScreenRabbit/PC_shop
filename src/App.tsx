import "./App.css";
import MainPage from "./mainPage/mainPage";
import Header from "./header/header";
import { Col, Row } from "react-bootstrap";
import { Route, Routes, BrowserRouter, Router } from "react-router-dom";
import ProductPage from "./productPage/ProductPage";
import Basket from "./basket/basket";
import axios from "axios";
import { useEffect } from "react";
import { connect } from "react-redux";
import { actions } from "./actions and const/actions";
import { EquipmentsType } from "./equipmentType/equipmentType";
import Footer from "./footer/footer";

type PropsType = {
    setEquipmentsFromServer: (a: EquipmentsType) => void;
};

function App(props: PropsType) {
    useEffect(() => {
        axios.get("https://my-json-server.typicode.com/GreenScreenRabbit/PC_Shop_server/equipment").then((response) => {
            props.setEquipmentsFromServer(response.data);
            console.log(response.data);
        });
    }, []);

    return (
        <>
            <Row>
                <Col md={{ span: 12 }}>
                    <Header />
                </Col>
                <Col>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/productPage" element={<ProductPage />} />
                            <Route path="/basket" element={<Basket />} />
                        </Routes>
                </Col>
                <Col md={{ span: 12 }}>
                    <Footer />
                </Col>
            </Row>
        </>
    );
}

export default connect(null, { setEquipmentsFromServer: actions.setEquipmentsFromServer })(App);

import "./App.css";
import MainPage from "./mainPage/mainPage";
import Header from "./header/header";
import { Col, Row } from "react-bootstrap";
import { Route, Routes, BrowserRouter, Router } from "react-router-dom";
import ProductPage from "./productPage/ProductPage";
import Basket from "./basket/basket";
import axios from "axios";
import { useEffect } from "react";

function App() {
    // axios.get('https://my-json-server.typicode.com/GreenScreenRabbit/gamingShop-server/gamingDevices')

    useEffect(() => {
        axios.get("https://my-json-server.typicode.com/GreenScreenRabbit/PC_Shop_server/equipment").then((response) => {
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
                    {/* <BrowserRouter> */}
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/productPage" element={<ProductPage />} />
                        <Route path="/basket" element={<Basket />} />
                    </Routes>
                    {/* </BrowserRouter> */}
                </Col>
            </Row>
        </>
    );
}

export default App;

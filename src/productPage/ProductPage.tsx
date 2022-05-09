import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { connect, RootStateOrAny } from "react-redux";
import { actions } from "../actions and const/actions";
import { OneOfEquipmentType } from "../equipmentType/equipmentType";
import CompereWithPage from "./compereWithPage/compereWithPage";
import "./productPage.css";

type PropsType = {
    selectedEquipment: OneOfEquipmentType;
    setBasketEquipment: (equi: OneOfEquipmentType) => void;
};

const ProductPage = (props: PropsType) => {
    const [imgCount, setImgCount] = useState(props.selectedEquipment.imgs.length);
    const [selectedImg, setSelectedImg] = useState(0);

    const changeImgCountOnMouse = (isAdd: boolean) => {
        if (props.selectedEquipment.imgs.length - 1 < selectedImg + 1 && isAdd === true) return;
        if (selectedImg <= 0 && isAdd === false) return;

        isAdd ? setSelectedImg(selectedImg + 1) : setSelectedImg(selectedImg - 1);
    };

    const changeMarginLeftImgInLine = () => {
        if (selectedImg > props.selectedEquipment.imgs.length - 1) return;

        return 100 * selectedImg;
    };

    const renderChar = () => {
        const forReturn = [];

        const objChar = props.selectedEquipment.characteristics[0];

        let index = 0;
        for (const key in objChar) {
            const values = Object.values(objChar);

            forReturn.push({ name: key, char: values[index] });

            index++;
        }

        return forReturn;
    };


    return (
        <>
            <Row>
                <Col md={{ offset: 1 }}>
                    <div className="productPage-imgWindow">
                        <div
                            className="productPage-prevBut"
                            onClick={() => {
                                changeImgCountOnMouse(false);
                            }}
                        ></div>
                        <div
                            className="productPage-imgConInLine"
                            style={{
                                width: 100 * imgCount + "%",
                                marginLeft: "-" + (changeMarginLeftImgInLine() + "%"),
                            }}
                        >
                            {props.selectedEquipment.imgs.map((img) => {
                                return (
                                    <div className="productPage-imgContainer" style={{ width: 100 / imgCount + "%" }}>
                                        <img src={img} className="productPage-img" />
                                    </div>
                                );
                            })}
                        </div>
                        <div
                            className="productPage-nextBut"
                            onClick={() => {
                                changeImgCountOnMouse(true);
                            }}
                        ></div>
                    </div>
                </Col>
                <Col md={{ span: 5 }}>
                    <div className="mainInformation">
                        <Row className="nameLine">
                            <Col>
                                <div className="nameLine-text">{props.selectedEquipment.name}</div>
                            </Col>
                        </Row>
                        <Row className="price-container">
                            <Col md={{ span: 5 }} className="price-itemsContainer">
                                <div className="price-item">PRICE : {props.selectedEquipment.price} $</div>
                            </Col>
                            <Col md={{ span: 4 }}>
                                <Button
                                    variant="success"
                                    className="price-buyButton"
                                    onClick={() => {
                                        props.setBasketEquipment(props.selectedEquipment);
                                    }}
                                >
                                    BUY
                                </Button>
                            </Col>
                        </Row>

                        <Row className="charBigCont">
                            <Col md={{ offset: 1, span: 4 }}>
                                {renderChar().map((ch) => {
                                    return (
                                        <div className="charBigCont-charCont">
                                            <div className="charBigCont-name">{ch.name} :</div>
                                            <div className="charBigCont-char">{ch.char}</div>
                                        </div>
                                    );
                                })}
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <CompereWithPage />
        </>
    );
};

const mapStateToProps = (state: RootStateOrAny) => ({
    selectedEquipment: state.mainPageState.selectedEquipment,
});

export default connect(mapStateToProps, {
    setBasketEquipment: actions.setBasketEquipment,
})(ProductPage);

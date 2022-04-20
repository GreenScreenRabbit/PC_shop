import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { MotherboardType, OneOfEquipmentsArrayType, OneOfEquipmentType } from "../../equipmentType/equipmentType";
import "./popUpFit.css";

type PropsType = {
    isPopUpFitOpen: boolean;
    clickedUnFitEquipment: (MotherboardType[] | OneOfEquipmentType)[];
    setIsPopUpFitOpen: (bol: boolean) => void;
};

const PopUpFit = (props: PropsType) => {
    const [isShowBody, setIsShowBody] = useState(false);

    useEffect(() => {
        setIsShowBody(true);
    }, []);

    console.log("props.clickedUnFitEquipment");
    console.log(props.clickedUnFitEquipment);

    const motherboards: MotherboardType[] = [];
    let dontFitEquipment: OneOfEquipmentType | undefined;

    const splitMotherboardsAndSelectedEquipment = () => {
        if (props.isPopUpFitOpen)
            props.clickedUnFitEquipment.forEach((equipment) => {
                if (Array.isArray(equipment)) {
                    equipment.forEach((motherboard) => {
                        motherboards.push(motherboard);
                    });
                } else {
                    // setDontFitEquipment(equipment);
                    dontFitEquipment = equipment;
                }
            });
    };
    splitMotherboardsAndSelectedEquipment();

    return (
        <div
            className="popUpFit"
            style={{ opacity: isShowBody ? "100%" : "0%" }}
            // style={{ opacity: props.isPopUpFitOpen ? "100%" : "0%", height: props.isPopUpFitOpen ? "100%" : "0%" }}
        >
            <div className="popUpFit-wallpaper"></div>
            <div className="popUpFit-body">
                <Row style={{ height: "85%", overflow: "hidden" }}>
                    <Col md={{ span: 5 }}>
                        <div className="popUpFit-equipment">
                            <div className="popUpFit-equipment-body">{dontFitEquipment!.name}</div>
                        </div>
                    </Col>
                    <Col md={{ span: 2 }} style={{ height: "100%" }}>
                        <div className="popUpFit-dontFitText">Dont fit to:</div>
                    </Col>
                    <Col md={{ span: 5 }} className="popUpFit-motherboard-col">
                        <div className="popUpFit-motherboard-closeBut">
                            <p
                                onClick={() => {
                                    props.setIsPopUpFitOpen(false);
                                }}
                            ></p>
                        </div>
                        <div className="popUpFit-motherboardCon">
                            <div className="popUpFit-motherboard-container">
                                <div className="popUpFit-motherboard-body"></div>
                                <div className="popUpFit-motherboard-body"></div>
                                <div className="popUpFit-motherboard-body"></div>
                                <div className="popUpFit-motherboard-body"></div>
                                <div className="popUpFit-motherboard-body"></div>
                                <div className="popUpFit-motherboard-body"></div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row style={{ height: "15%" }} className="popUpFit-dontCareRow">
                    <Col md={{ offset: 5, span: 2 }}>
                        <button
                            className="popUpFit-dontCareBut"
                            onClick={() => {
                                props.setIsPopUpFitOpen(false);
                            }}
                        >
                            DONT CARE
                        </button>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default connect(null, null)(PopUpFit);

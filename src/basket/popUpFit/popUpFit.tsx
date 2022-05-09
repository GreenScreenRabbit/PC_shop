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
                    dontFitEquipment = equipment;
                }
            });
    };
    splitMotherboardsAndSelectedEquipment();

    return (
        <div
            className="popUpFit"
            style={{ opacity: isShowBody ? "100%" : "0%" }}
        >
            <div className="popUpFit-wallpaper"></div>
            <div className="popUpFit-body">
                <Row style={{ height: "85%", overflow: "hidden" }}>
                    <Col md={{ span: 5 }}>
                        <div className="popUpFit-equipment">
                            <div className="popUpFit-equipment-body">
                                <div className="popUpFit-equipment-body-imgCon">
                                    <img src={dontFitEquipment!.imgs[0]} className="popUpFit-equipment-body-img" />
                                </div>
                                <div className="popUpFit-equipment-body-name">{dontFitEquipment!.name}</div>
                            </div>
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
                                {motherboards.map((motherboard) => {
                                    return <div className="popUpFit-motherboard-body">
                                        <div className="popUpFit-motherboard-body-imgCon">
                                            <img src={motherboard.imgs[0]} className="popUpFit-motherboard-body-img" />
                                        </div>
                                        <div className="popUpFit-motherboard-body-name">{motherboard.name}</div>
                                        </div>;
                                })}
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

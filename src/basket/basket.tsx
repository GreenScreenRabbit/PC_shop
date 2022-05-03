import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { connect, RootStateOrAny } from "react-redux";
import { actions } from "../actions and const/actions";
import {
    EnumNameType,
    MotherboardType,
    OneOfEquipmentsArrayType,
    OneOfEquipmentType,
    ProcessorType,
    RAM_Type,
    VideoCardType,
} from "../equipmentType/equipmentType";
import "./basket.css";
import PopUpFit from "./popUpFit/popUpFit";
import PopUpPay from "./popUpPay/popUpPay";

type PropsType = {
    basket: OneOfEquipmentType[];
    deleteEquipmentFromBasketAtIndex: (index: number) => void;
};

const Basket = (props: PropsType) => {
    const [isPopUpFitOpen, setIsPopUpFitOpen] = useState<boolean>(false);

    const [name, setName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [street, setStreet] = useState<string>();
    const [house, setHouse] = useState<string>();

    const [clickedUnFitEquipment, setClickedUnFitEquipment] = useState<(MotherboardType[] | OneOfEquipmentType)[][]>(
        []
    );

    const dontFitEquipmentsAndMotherbpard: (MotherboardType[] | OneOfEquipmentType)[][] = [];
    const [isShowPopUpFit, setIsShowPopUpFit] = useState<boolean>(false);

    let isHaveDontFitEquipment = false;

    const createJSON_PayFormula = () => {
        const JSON_PayFormula = {
            name,
            lastName,
            street,
            house,
        };
        console.log(JSON_PayFormula);
        console.log("THE END");
        return JSON_PayFormula;
    };
    createJSON_PayFormula();

    const findDontFitInBasket = (basketArray: OneOfEquipmentType[]) => {
        const motherboards: Extract<OneOfEquipmentType, MotherboardType>[] = [];
        const processors: Extract<OneOfEquipmentType, ProcessorType>[] = [];
        const RAMS: Extract<OneOfEquipmentType, RAM_Type>[] = [];

        const findMotherboarsVideoCardsRAMs = () => {
            basketArray.forEach((equi) => {
                if (equi.typeItem == EnumNameType.motherboard) {
                    motherboards.push(equi);
                }
                if (equi.typeItem == EnumNameType.processor) {
                    processors.push(equi);
                }

                if (equi.typeItem == EnumNameType.RAM) {
                    RAMS.push(equi);
                }
            });
        };
        findMotherboarsVideoCardsRAMs();

        const findDontFitEqui = () => {
            const motherboardComparisonCharacteristic = (comparisChar: string) => {
                const unFitMot = new Set<MotherboardType>();

                motherboards.forEach((motherboard) => {
                    return motherboard.characteristics.forEach((char) => {
                        if (comparisChar != char.RAM_Technology) {
                            unFitMot.add(motherboard);
                        }
                    });
                });

                return Array.from(unFitMot);
            };

            const findDontFitRAMS = () => {
                RAMS.forEach((RAM) => {
                    let RAM_TechnologyFromRAM: string = "";

                    RAM.characteristics.forEach((characteristicRAM) => {
                        RAM_TechnologyFromRAM = characteristicRAM.RAM_Technology;
                    });
                    const unFitMotArray = motherboardComparisonCharacteristic(RAM_TechnologyFromRAM);

                    if (unFitMotArray.length != 0) {
                        dontFitEquipmentsAndMotherbpard.push([RAM, unFitMotArray]);
                    }
                });
            };
            const findDontFitProcessors = () => {
                processors.forEach((processor) => {
                    let processorSocketFromProcessor: string = "";

                    processor.characteristics.forEach((char) => (processorSocketFromProcessor = char.socket));

                    const unFitMotArray = motherboardComparisonCharacteristic(processorSocketFromProcessor);

                    if (unFitMotArray.length != 0) {
                        dontFitEquipmentsAndMotherbpard.push([processor, unFitMotArray]);
                    }
                });
            };
            findDontFitRAMS();
            findDontFitProcessors();
        };
        findDontFitEqui();

        if (dontFitEquipmentsAndMotherbpard.length != 0) {
            isHaveDontFitEquipment = true;
            // setIsHaveDontFitEquipment(true)
        }

        console.log("dontFitEquipmentsAndMotherbpard");
        console.log(dontFitEquipmentsAndMotherbpard);
    };

    findDontFitInBasket(props.basket);

    return (
        <>
            <div className="basket-body" style={{ zIndex: 1 }}>
                <Row>
                    <Col md={{ span: 10, offset: 1 }}>
                        <Row>
                            <Col md={8}>
                                <Row className="basket-row">
                                    <Col>
                                        <div className="basket-inputCon">
                                            <div className="basket-inputCon-name">FIRST NAME</div>
                                            <input
                                                type="text"
                                                className="basket-inputCon-input"
                                                onChange={(e) => {
                                                    setName(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="basket-inputCon">
                                            <div className="basket-inputCon-name">LASTNAME</div>
                                            <input
                                                type="text"
                                                className="basket-inputCon-input"
                                                onChange={(e) => {
                                                    setLastName(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="basket-row">
                                    <Col>
                                        <div className="basket-inputCon">
                                            <div className="basket-inputCon-name">STREET</div>
                                            <input
                                                type="text"
                                                className="basket-inputCon-input"
                                                onChange={(e) => {
                                                    setStreet(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="basket-inputCon">
                                            <div className="basket-inputCon-name">HOUSE</div>
                                            <input
                                                type="text"
                                                className="basket-inputCon-input"
                                                onChange={(e) => {
                                                    setHouse(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="basket-row">
                                    <Col md={{ span: 2, offset: 5 }}>
                                        <button
                                            className="basket-payBut"
                                            onClick={() => {
                                                setIsShowPopUpFit(true);
                                            }}
                                        >
                                            PAY
                                        </button>
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </Col>
                            <Col md={4}>
                                <div className="basket-itemsCpntainer">
                                    {props.basket.length != 0 ? (
                                        props.basket.map((equi, index) => {
                                            let isRenderDontFit: boolean = false;

                                            const dontFitElems: (MotherboardType[] | OneOfEquipmentType)[][] = [];

                                            const ifRenderDontFit = () => {
                                                dontFitEquipmentsAndMotherbpard.forEach((equipmentsArray) => {
                                                    let sameName: boolean = false;
                                                    equipmentsArray.forEach((equipmentsArrayAndObject) => {
                                                        if (Array.isArray(equipmentsArrayAndObject)) {
                                                        } else {
                                                            if (equipmentsArrayAndObject.name == equi.name) {
                                                                sameName = true;
                                                                isRenderDontFit = true;
                                                            }
                                                        }
                                                        if (sameName) {
                                                            dontFitElems.push(equipmentsArray);
                                                        }
                                                    });
                                                });
                                            };
                                            ifRenderDontFit();

                                            return (
                                                <div className="basket-item">
                                                    <div className="basket-item-name">{equi.name}</div>
                                                    <div className="basket-item-price">
                                                        <p>PRICE: {equi.price} $</p>
                                                    </div>
                                                    <img src={equi.imgs[0]} className="basket-item-img" />
                                                    {isRenderDontFit ? (
                                                        <div
                                                            className="basket-item-dontFitBut"
                                                            onClick={() => {
                                                                clickedUnFitEquipment.push(dontFitElems[0]);
                                                                setIsPopUpFitOpen(true);
                                                            }}
                                                        >
                                                            <p>something dont fit</p>
                                                        </div>
                                                    ) : (
                                                        <div></div>
                                                    )}
                                                    <div
                                                        className="basket-item-deleteBut"
                                                        onClick={() => {
                                                            props.deleteEquipmentFromBasketAtIndex(index);
                                                        }}
                                                    ></div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div>EMPTY</div>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

            {isPopUpFitOpen ? (
                <PopUpFit
                    isPopUpFitOpen={isPopUpFitOpen}
                    clickedUnFitEquipment={clickedUnFitEquipment[0]}
                    setIsPopUpFitOpen={setIsPopUpFitOpen}
                />
            ) : null}
            {isShowPopUpFit ? (
                <PopUpPay
                    isShowPopUpFit={isShowPopUpFit}
                    isHaveDontFitEquipment={isHaveDontFitEquipment}
                    setIsShowPopUpFit={setIsShowPopUpFit}
                />
            ) : null}
        </>
    );
};

const mapStateToProps = (state: RootStateOrAny) => ({
    basket: state.mainPageState.basket,
});

export default connect(mapStateToProps, { deleteEquipmentFromBasketAtIndex: actions.deleteEquipmentFromBasketAtIndex })(
    Basket
);

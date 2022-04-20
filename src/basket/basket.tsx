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

type PropsType = {
    basket: OneOfEquipmentType[];
    deleteEquipmentFromBasketAtIndex: (index: number) => void;
};

const Basket = (props: PropsType) => {
    const [isPopUpFitOpen, setIsPopUpFitOpen] = useState<boolean>(false);

    // const dontFitEquipmentsAndMotherbpard: (OneOfEquipmentsArrayType[] |  OneOfEquipmentType )[] = [];

    // const clickedUnFitEquipment: (OneOfEquipmentsArrayType | OneOfEquipmentType)[] = [];
    // const dontFitEquipmentsAndMotherbpard: (OneOfEquipmentsArrayType | OneOfEquipmentType)[][] = [];

    // const [clickedUnFitEquipment, setClickedUnFitEquipment] = useState<(OneOfEquipmentType | OneOfEquipmentsArrayType)[]>([]);
    const [clickedUnFitEquipment, setClickedUnFitEquipment] = useState<(MotherboardType[] | OneOfEquipmentType)[][]>([]);
    const dontFitEquipmentsAndMotherbpard: (MotherboardType[] | OneOfEquipmentType)[][] = [];

    console.log("clickedUnFitEquipment");
    console.log(clickedUnFitEquipment);

    const findDontFitInBasket = (basketArray: OneOfEquipmentType[]) => {
        const motherboards: Extract<OneOfEquipmentType, MotherboardType>[] = [];
        const processors: Extract<OneOfEquipmentType, ProcessorType>[] = [];
        const RAMS: Extract<OneOfEquipmentType, RAM_Type>[] = [];

        // const dontFitRAMandMotherbpard: (MotherboardType[] | RAM_Type)[][] = [];
        // const dontFitProcessorsAndMotherbpard: (MotherboardType[] | ProcessorType)[][] = [];

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
                        // dontFitRAMandMotherbpard.push([RAM, unFitMotArray]);

                        const arr1 = [RAM, unFitMotArray];

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
                        // dontFitProcessorsAndMotherbpard.push([processor, unFitMotArray]);
                        dontFitEquipmentsAndMotherbpard.push([processor, unFitMotArray]);
                    }
                });
            };
            findDontFitRAMS();
            findDontFitProcessors();
        };
        findDontFitEqui();

        console.log("dontFitEquipmentsAndMotherbpard");
        console.log(dontFitEquipmentsAndMotherbpard);
    };

    const a = findDontFitInBasket(props.basket);

    console.log("a");
    console.log(a);

    return (
        <>
            <div className="basket-body" style={{ zIndex: 1 }}>
                <Row>
                    <Col md={{ span: 10, offset: 1 }}>
                        <Row>
                            <Col md={8}>
                                <div
                                    onClick={() => {
                                        setIsPopUpFitOpen(true);
                                    }}
                                    style={{
                                        height: "100px",
                                        width: "100px",
                                        position: "relative",
                                        backgroundColor: "green",
                                    }}
                                >
                                    vvvv
                                </div>
                                8
                            </Col>
                            <Col md={4}>
                                <div className="basket-itemsCpntainer">
                                    {props.basket.length != 0 ? (
                                        props.basket.map((equi, index) => {
                                            let isRenderDontFit: boolean = false;

                                            // const dontFitElems: (OneOfEquipmentsArrayType | OneOfEquipmentType)[] = [];
                                            const dontFitElems: (MotherboardType[] | OneOfEquipmentType)[][] = [];

                                            const ifRenderDontFit = () => {
                                                dontFitEquipmentsAndMotherbpard.forEach((equipmentsArray) => {
                                                    let sameName: boolean = false;
                                                    equipmentsArray.forEach((equipmentsArrayAndObject) => {
                                                        if (Array.isArray(equipmentsArrayAndObject)) {
                                                        } else {
                                                            if (equipmentsArrayAndObject.name == equi.name) {
                                                                // clickedUnFitEquipment.push(equipmentsArrayAndObject)
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

            { isPopUpFitOpen ? <PopUpFit isPopUpFitOpen={isPopUpFitOpen} clickedUnFitEquipment={clickedUnFitEquipment[0]} setIsPopUpFitOpen={setIsPopUpFitOpen} /> : null}
             {/* <PopUpFit isPopUpFitOpen={isPopUpFitOpen} clickedUnFitEquipment={clickedUnFitEquipment[0]} setIsPopUpFitOpen={setIsPopUpFitOpen} />  */}
        </>
    );
};

const mapStateToProps = (state: RootStateOrAny) => ({
    basket: state.mainPageState.basket,
});

export default connect(mapStateToProps, { deleteEquipmentFromBasketAtIndex: actions.deleteEquipmentFromBasketAtIndex })(
    Basket
);

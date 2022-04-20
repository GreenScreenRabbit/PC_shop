import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { connect, RootStateOrAny } from "react-redux";
import { EquipmentsType, OneOfEquipmentsArrayType, OneOfEquipmentType } from "../../equipmentType/equipmentType";
import "./compereWithPage.css";

type PropsType = {
    selectedEquipment: OneOfEquipmentType;
    equipments: EquipmentsType;
};

const CompereWithPage = (props: PropsType) => {
    const [isMouseOnItemsContainer, setIsMouseOnItemsContainer] = useState<boolean>(false);
    const [mouseAfterClickPos, setMouseAfterClickPos] = useState<string>("");
    const [mouseAfterClickPosUpMouse, setMouseAfterClickPosUpMouse] = useState<string>("");
    const [marginLeftItemsBox, setMarginLeftItemsBox] = useState<number>(0);

    const itemsBoxContainerRef = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLDivElement>(null);

    const values = Object.values(props.selectedEquipment);

    const characteristicsKeys: string[] = [];

    // useEffect(() => {
    //     charForRenderValueMain();
    // }, []);

    const takeFilteredEquipment = (equipments: EquipmentsType) => {
        const restEqui: OneOfEquipmentType[] = [];

        const requiredEqui: OneOfEquipmentType[] = [];

        console.log("Mde");

        Object.entries(equipments).find(([key, value]) => {
            console.log("key");
            console.log(key);
            console.log("props.selectedEquipment.typeItem");
            console.log(props.selectedEquipment.typeItem);

            value.forEach((v) => {
                if (v.typeItem === props.selectedEquipment.typeItem) {
                    requiredEqui.push(v);
                }
            });

            // if (key == props.selectedEquipment.typeItem) {

            //     requiredEqui.push(value);
            // }
        });

        const takeNonSelectedEqui = (requiredEqui: OneOfEquipmentType[]) => {
            requiredEqui.forEach((equi) => {
                if (equi.name != props.selectedEquipment.name) {
                    restEqui.push(equi);
                    console.log("equi");
                    console.log(equi);
                }
            });
        };
        takeNonSelectedEqui(requiredEqui);

        return restEqui;
    };

    const restEquiForCompere = takeFilteredEquipment(props.equipments);

    const charForRenderKeyMain = () => {
        props.selectedEquipment.characteristics.forEach((item) => {
            Object.keys(item).map((it) => {
                characteristicsKeys.push(it);
                console.log(`it = ${it}`);
            });
        });
    };

    charForRenderKeyMain();

    const charForRenderValueMain = (arrayEqui: OneOfEquipmentType) => {
        // return props.selectedEquipment.characteristics.map((item) => {

        const valuesResult: string[] = [];

        // props.selectedEquipment.characteristics.forEach((item) => {
        arrayEqui.characteristics.forEach((item) => {
            console.log("item");
            console.log(item);

            Object.values(item).map((it) => {
                // characteristicsValue.push(it.split(","));

                // valuesResult.push(it.split(","));
                valuesResult.push(it);

                console.log("it.split(", ")");
                console.log(it.split(","));

                // return it.split(",");
            });
        });

        return valuesResult;

        // return characteristicsValue;
    };

    const characteristicsValue = charForRenderValueMain(props.selectedEquipment);

    const changeItemsContainerPosition = (e: React.MouseEvent) => {
        if (isMouseOnItemsContainer) {
            const betweenMouseAndEl = e.pageX - +mouseAfterClickPos;
            // const betweenMouseAndEl = e.pageX - container.current?.getBoundingClientRect().x! - +isMouseAfterClickPos
            // const betweenMouseAndEl = e.pageX - itemsBoxContainerRef.current?.getBoundingClientRect().x!
            // const betweenMouseAndEl = e.pageX - +isMouseAfterClickPos;

            // console.log(`betweenMouseAndEl = ${betweenMouseAndEl}`);

            if (betweenMouseAndEl) {
                setMarginLeftItemsBox(betweenMouseAndEl + +mouseAfterClickPosUpMouse);
                // setMarginLeftItemsBox(betweenMouseAndEl);
                // itemsBoxContainerRef.current!.style.marginRight = "-" + betweenMouseAndEl.toString() + "px"
                // itemsBoxContainerRef.current!.style.marginLeft = betweenMouseAndEl.toString() + "px";
            }

            console.log(`itemsBoxContainerRef = ${itemsBoxContainerRef.current?.getBoundingClientRect().x}`);

            // console.log(`e.pageX = ${e.pageX}`);
        }
    };

    return (
        <>
            <div>
                <Row>
                    <Col md={{ span: 10, offset: 1 }}>
                        <Row style={{ backgroundColor: "red" }}>
                            <Col md={2} sm={2}>
                                <div className="compereWithPage-categories">*</div>
                                {characteristicsKeys.length != 0 ? (
                                    characteristicsKeys.map((key) => {
                                        return <div className="compereWithPage-categories">{key}</div>;
                                    })
                                ) : (
                                    <div>f</div>
                                )}
                            </Col>
                            <Col md={2} sm={4}>
                                <div className="compereWithPage-categories">
                                    <b>{props.selectedEquipment.name}</b>
                                </div>
                                {/* {charForRenderValueMain().map((item) => { */}
                                {characteristicsValue.length != 0 ? (
                                    characteristicsValue.map((item) => {
                                        return <div className="compereWithPage-categories">{item}</div>;
                                    })
                                ) : (
                                    <div>F</div>
                                )}
                            </Col>
                            <Col md={8} sm={6} style={{ backgroundColor: "blue" }}>
                                <div className="compereWithPage-comperesCategoriesContainer" ref={container}>
                                    <div
                                        ref={itemsBoxContainerRef}
                                        draggable={false}
                                        className="compereWithPage-comperesCategoriesContainer-itemsBox"
                                        style={{ marginLeft: marginLeftItemsBox }}
                                        onMouseDown={(e) => {
                                            setMouseAfterClickPos(e.pageX.toString());
                                            setIsMouseOnItemsContainer(true);
                                        }}
                                        // onMouseOut={() => {
                                        //     setIsMouseOnItemsContainer(false);
                                        // }}

                                        onMouseUp={() => {
                                            setMouseAfterClickPosUpMouse(marginLeftItemsBox.toString());
                                            setIsMouseOnItemsContainer(false);
                                        }}
                                        onMouseEnter={() => {
                                            setIsMouseOnItemsContainer(false);
                                        }}
                                        onMouseMove={(e) => {
                                            changeItemsContainerPosition(e);
                                        }}
                                    >
                                        {/* TODO: end restEquiForCompere */}

                                        {restEquiForCompere.map((equi) => {
                                            return (
                                                <div className="box">
                                                    <div className="compereWithPage-categories">
                                                        <b>{equi.name}</b>
                                                    </div>
                                                    {charForRenderValueMain(equi).map((ch) => {
                                                        return <div className="compereWithPage-categories">{ch}</div>;
                                                    })}
                                                </div>
                                            );
                                        })}

                                        {/* <div className="box"></div>
                                        <div className="box"></div>
                                        <div className="box"></div>
                                        <div className="box"></div>
                                        <div className="box"></div>
                                        <div className="box"></div>
                                        <div className="box"></div>
                                        <div className="box"></div>
                                        <div className="box"></div>
                                        <div className="box"></div>
                                        <div className="box"></div>
                                        <div className="box"></div>
                                        <div className="box"></div>
                                        <div className="box"></div> */}
                                    </div>
                                </div>
                                {/* <div className="compereWithPage-itemsForCompereContainer">2</div> */}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    );
};

const mapStateToProps = (state: RootStateOrAny) => ({
    selectedEquipment: state.mainPageState.selectedEquipment,
    equipments: state.mainPageState.equipments,
});

export default connect(mapStateToProps, {})(CompereWithPage);

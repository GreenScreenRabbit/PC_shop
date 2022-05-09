import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { connect, RootStateOrAny } from "react-redux";
import { actions } from "../../actions and const/actions";
import { EquipmentsType, OneOfEquipmentsArrayType, OneOfEquipmentType } from "../../equipmentType/equipmentType";
import "./compereWithPage.css";

type PropsType = {
    selectedEquipment: OneOfEquipmentType;
    equipments: EquipmentsType;
    setSelectedEquipment: (item: OneOfEquipmentType) => void;
};


const CompereWithPage = (props: PropsType) => {
    const [isMouseOnItemsContainer, setIsMouseOnItemsContainer] = useState<boolean>(false);
    const [mouseAfterClickPos, setMouseAfterClickPos] = useState<string>("");
    const [mouseAfterClickPosUpMouse, setMouseAfterClickPosUpMouse] = useState<string>("");
    const [marginLeftItemsBox, setMarginLeftItemsBox] = useState<number>(0);
    const [canCkickAfterScroling, setCanCkickAfterScroling] = useState<boolean>(true);
    const [timerScrolingId, setTimerScrolingId] = useState<NodeJS.Timeout>();

    const itemsBoxContainerRef = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLDivElement>(null);

    const characteristicsKeys: string[] = [];

    const checkTimerMouseDont = () => {
        clearTimeout(timerScrolingId!);

        setCanCkickAfterScroling(true);

        let idTimer = setTimeout(() => {
            setCanCkickAfterScroling(false);
        }, 250);

        setTimerScrolingId(idTimer);
    };

    const takeFilteredEquipment = (equipments: EquipmentsType) => {
        const restEqui: OneOfEquipmentType[] = [];

        const requiredEqui: OneOfEquipmentType[] = [];

        Object.entries(equipments).find(([key, value]) => {
            value.forEach((v) => {
                if (v.typeItem === props.selectedEquipment.typeItem) {
                    requiredEqui.push(v);
                }
            });
        });

        const takeNonSelectedEqui = (requiredEqui: OneOfEquipmentType[]) => {
            requiredEqui.forEach((equi) => {
                if (equi.name != props.selectedEquipment.name) {
                    restEqui.push(equi);
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
            });
        });
    };

    charForRenderKeyMain();

    const charForRenderValueMain = (arrayEqui: OneOfEquipmentType) => {
        const valuesResult: string[] = [];

        arrayEqui.characteristics.forEach((item) => {
            Object.values(item).map((it) => {
                valuesResult.push(it);
            });
        });

        return valuesResult;
    };

    const characteristicsValue = charForRenderValueMain(props.selectedEquipment);

    const changeItemsContainerPosition = (e: React.MouseEvent) => {
        if (isMouseOnItemsContainer) {
            const betweenMouseAndEl = e.pageX - +mouseAfterClickPos;
            if (betweenMouseAndEl) {
                if (betweenMouseAndEl + +mouseAfterClickPosUpMouse < 0) {
                    setMarginLeftItemsBox(betweenMouseAndEl + +mouseAfterClickPosUpMouse);
                }
            }
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
                                            checkTimerMouseDont();
                                            setMouseAfterClickPos(e.pageX.toString());
                                            setIsMouseOnItemsContainer(true);
                                        }}
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
                                        {restEquiForCompere.map((equi) => {
                                            return (
                                                <div
                                                    className="box"
                                                    onClick={() => {
                                                        if (canCkickAfterScroling) {
                                                            props.setSelectedEquipment(equi);
                                                        }
                                                    }}
                                                >
                                                    <div className="compereWithPage-categories">
                                                        <b>{equi.name}</b>
                                                    </div>
                                                    {charForRenderValueMain(equi).map((ch) => {
                                                        return <div className="compereWithPage-categories">{ch}</div>;
                                                    })}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
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

export default connect(mapStateToProps, {
    setSelectedEquipment: actions.setSelectedEquipment,
})(CompereWithPage);

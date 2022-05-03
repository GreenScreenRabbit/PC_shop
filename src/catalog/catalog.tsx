import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { connect, RootStateOrAny } from "react-redux";
import { Link } from "react-router-dom";
import { actions } from "../actions and const/actions";
import { EquipmentsType, OneOfEquipmentsArrayType, OneOfEquipmentType } from "../equipmentType/equipmentType";
import "./catalog.css";

type PropsType = {
    catalogHeightBody: number;
    equipments: EquipmentsType;
    equipmentTypeForSort: string;
    setSelectedEquipment: (item: OneOfEquipmentType) => void;
    isCatalogBodyOpen: boolean;
};

const Catalog = (props: PropsType) => {
    const sortedTypeEquiName: OneOfEquipmentsArrayType[] = [];
    // const sortedAsEquiName: OneOfEquipmentsArrayType[] = [];
    // const [sortedEquiName, setSortedEquiName] = useState<OneOfEquipmentsArrayType[]>([]);
    type KeyTitleWithoutContentType = {
        titleChar: string;
        allChar: string[];
    };
    const keyTitleWithContent: KeyTitleWithoutContentType[] = [];

    const [render, setRender] = useState(false);

    const [isOpenCatalog, setIsOpenCatalog] = useState<boolean>(false);

    const sortEquipment = () => {
        //TODO: сортить типи и кейТитл
        sortedTypeEquiName
    }

    const createFiltersButtons = () => {
        const keyTitleWithoutContent: KeyTitleWithoutContentType[] = [];

        const createCratTitleWithoutContentAndPushToContentWittEmptyContent = () => {
            const returnNonDuplicateTitleCharFor_KeyTitleWithoutContentWithout = (
                payloads: KeyTitleWithoutContentType[]
            ) => {

                let isHaveDuplicate = false;

                const result: KeyTitleWithoutContentType[] = [];

                keyTitleWithoutContent.forEach((keyTitle) => {
                    payloads.forEach((payload) => {
                        if (keyTitle.titleChar == payload.titleChar) {
                            isHaveDuplicate = true;
                            result.push(payload);
                        }
                    });
                });
                if (isHaveDuplicate === false) {
                    return result;
                }
            };

            const createTitleCharWithEmptyContent = () => {
                const result: KeyTitleWithoutContentType[] = [];

                sortedTypeEquiName.forEach((equipmentsArray) => {
                    equipmentsArray.forEach((equi) => {
                        equi.characteristics.forEach((char) => {
                            const keys = Object.keys(char);

                            const concatValueAndKey = () => {
                                keys.forEach((key) => {
                                    const payload = {
                                        titleChar: key,
                                        allChar: [],
                                    };

                                    const checkDontDuplicate = (payload: KeyTitleWithoutContentType) => {
                                        let isHaveDupl = false;

                                        result.forEach((keyTitle) => {
                                            if (keyTitle.titleChar === payload.titleChar) {
                                                isHaveDupl = true;
                                            }
                                        });

                                        if (isHaveDupl === false) {
                                            return payload;
                                        }
                                    };

                                    if (checkDontDuplicate(payload) != undefined) {
                                        result.push(payload);
                                    }
                                });
                            };
                            concatValueAndKey();
                        });
                    });
                });

                return result;
            };

            createTitleCharWithEmptyContent();

            const addToKeyTitleWithoutContent = () => {
                createTitleCharWithEmptyContent().forEach((charArray) => {
                    keyTitleWithoutContent.push(charArray);
                });
            };

            const addContextWithoutAllCrahFor_keyTitleWithContent = () => {
                keyTitleWithoutContent.forEach((k) => {
                    keyTitleWithContent.push(k);
                });
            };

            addToKeyTitleWithoutContent();
            addContextWithoutAllCrahFor_keyTitleWithContent();

            const c = returnNonDuplicateTitleCharFor_KeyTitleWithoutContentWithout(createTitleCharWithEmptyContent());

            console.log("c");
            console.log(c);
        };

        const addContentForKeyTitleWithContent = () => {
            const retuerNonDuplValue = (value: string) => {
                let isHaveDup = false;

                keyTitleWithContent.forEach((keyTitle) => {
                    keyTitle.allChar.forEach((char) => {
                        if (char === value) {
                            isHaveDup = true;
                        }
                    });
                });

                if (isHaveDup == false) {
                    return value;
                }
            };

            const nonDuplAllChar: string[] = [];

            sortedTypeEquiName.forEach((equiArray) => {
                equiArray.forEach((equi) => {
                    equi.characteristics.forEach((char) => {
                        const values = Object.values(char);
                        const keys = Object.keys(char);

                        values.forEach((value, valueIndex) => {
                            const payload = retuerNonDuplValue(value);

                            console.log("value");
                            console.log(value);

                            if (payload != undefined) {
                                keyTitleWithContent.forEach((keyTitle) => {
                                    if (keyTitle.titleChar === keys[valueIndex]) {
                                        keyTitle.allChar.push(payload);
                                    }
                                });
                            }
                        });
                    });
                });
            });

            console.log("nonDuplAllChar");
            console.log(nonDuplAllChar);
        };

        createCratTitleWithoutContentAndPushToContentWittEmptyContent();
        addContentForKeyTitleWithContent();

        console.log("keyTitleWithoutContent");
        console.log(keyTitleWithoutContent);

        console.log("keyTitleWithContent");
        console.log(keyTitleWithContent);
    };

    const equipmentTypeSort = () => {
        Object.entries(props.equipments).find(([key, value]) => {
            if (props.equipmentTypeForSort === "all") {
                sortedTypeEquiName.push(value);
                return;
            }
            if (key == props.equipmentTypeForSort) {
                sortedTypeEquiName.push(value);
            }
        });
    };

    if (props.equipments) {
        equipmentTypeSort();
    }

    createFiltersButtons();

    return (
        <>
            <div className="catalog-body" style={{ height: props.isCatalogBodyOpen ? "700px" : "0px" }}>
                <Row style={{ height: "100%" }}>
                    <Col md={2}>
                        <div className="catalog-filter">
                            <div></div>
                        </div>
                    </Col>
                    <Col md={10}>
                        {sortedTypeEquiName.map((equipmentsArray) => {
                            return equipmentsArray.map((item) => {
                                return (
                                    <Link to="/productPage">
                                        <div
                                            className="catalog-item"
                                            onClick={() => {
                                                props.setSelectedEquipment(item);
                                            }}
                                        >
                                            <img src={item.imgs[0]} className="catalog-item-img" />
                                            <div className="catalog-item-name">{item.name}</div>
                                            <div className="catalog-item-price">PRICE : {item.price} $</div>
                                        </div>
                                    </Link>
                                );
                            });
                        })}
                    </Col>
                </Row>
            </div>
        </>
    );
};

const mapStateToProps = (state: RootStateOrAny) => ({
    catalogHeightBody: state.mainPageState.catalogHeightBody,
    equipments: state.mainPageState.equipments,
    equipmentTypeForSort: state.mainPageState.equipmentTypeForSort,
    isCatalogBodyOpen: state.mainPageState.isCatalogBodyOpen,
});

export default connect(mapStateToProps, {
    setSelectedEquipment: actions.setSelectedEquipment,
})(Catalog);
